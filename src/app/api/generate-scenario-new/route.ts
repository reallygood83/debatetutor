import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Gemini Pro API 초기화
const MODEL_NAME = 'gemini-pro';
const API_KEY = process.env.GOOGLE_AI_API_KEY || '';

export async function POST(request: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'API 키가 설정되지 않았습니다.' 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // 안전 설정
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    // 요청 데이터 가져오기
    const { topic, grade, subject } = await request.json();

    if (!topic) {
      return NextResponse.json({ 
        success: false, 
        error: '토론 주제가 필요합니다.' 
      }, { status: 400 });
    }

    // 학년 정보 문자열
    const gradeText = grade ? `이 토론은 ${grade} 학생들을 대상으로 합니다.` : '';
    
    // 교과 정보 문자열  
    const subjectText = subject ? `이 토론은 ${subject} 교과와 관련이 있습니다.` : '';

    // 프롬프트 구성
    const prompt = `
당신은 초등학교 토론 교육 전문가입니다. 다음 주제에 대한 토론 시나리오를 만들어주세요:

"${topic}"

${gradeText}
${subjectText}

답변은 반드시 JSON 형식으로 다음 구조를 따라야 합니다:
{
  "title": "토론 주제의 제목",
  "topic": "찬성 vs 반대 형식의 토론 논제",
  "background": "토론 배경 설명 (200-300자)",
  "keywords": ["관련 키워드 5-7개"],
  "proArguments": ["찬성 측 논거 1", "찬성 측 논거 2", "찬성 측 논거 3"],
  "conArguments": ["반대 측 논거 1", "반대 측 논거 2", "반대 측 논거 3"],
  "teacherTips": "교사를 위한 지도 팁 (200-300자)",
  "keyQuestions": ["핵심 질문 1", "핵심 질문 2", "핵심 질문 3"],
  "grade": "권장 학년 범위 (예: '5-6학년')",
  "subject": "관련 교과목",
  "materials": ["필요한 준비물 1", "필요한 준비물 2"],
  "expectedOutcomes": ["기대 학습 성과 1", "기대 학습 성과 2", "기대 학습 성과 3"]
}

답변에는 반드시 유효한 JSON만 포함되어야 합니다. 다른 설명이나 서문은 모두 제외해주세요.
`;

    // AI 호출
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const response = result.response;
    const text = response.text();

    // JSON 응답 추출
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    let jsonResponse;

    if (jsonMatch) {
      try {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error('JSON 파싱 오류:', e);
        return NextResponse.json({ 
          success: false, 
          error: 'AI 응답을 파싱하는 중 오류가 발생했습니다.' 
        }, { status: 500 });
      }
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'AI 응답에서 유효한 JSON을 찾을 수 없습니다.' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      data: jsonResponse 
    });
  } catch (error: any) {
    console.error('AI 시나리오 생성 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'AI 시나리오 생성 중 오류가 발생했습니다.' 
    }, { status: 500 });
  }
} 