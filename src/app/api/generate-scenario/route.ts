import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 요청에서 토론 주제 추출
    const body = await req.json();
    const { topic, grade, subject } = body;
    
    if (!topic) {
      return NextResponse.json(
        { error: '토론 주제가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }
    
    // 안내 시스템 메시지 생성
    const systemMessage = `
      당신은 초등학교 토론 교육을 위한 전문가입니다. 
      경기초등토론교육모형에 맞는 토론 시나리오를 생성해 주세요.
      응답은 JSON 형식으로 제공해야 합니다.
    `;
    
    // 사용자 프롬프트 생성
    const userPrompt = `
      다음 주제에 대한 토론 시나리오를 만들어주세요: "${topic}"
      
      ${grade ? `대상 학년: ${grade}` : ''}
      ${subject ? `관련 교과: ${subject}` : ''}

      다음 정보를 JSON 형식으로 포함해주세요:
      1. "title": 토론의 명확한 주제 (예: "학교에 휴대폰을 가지고 오는 것의 찬반")
      2. "topic": 토론 주장 형식 (예: "초등학생은 학교에 휴대폰을 가지고 와야 한다 vs 가지고 오면 안 된다")
      3. "keywords": 주요 키워드 (최대 5개 배열)
      4. "grade": 추천 학년 (예: "5-6학년", "3-4학년"${grade ? ` - 입력된 값: ${grade}` : ''})
      5. "subject": 관련 교과목 (최대 3개 배열, 예: ["사회", "도덕"]${subject ? ` - 입력된 값: ${subject}` : ''})
      6. "background": 토론 배경 설명 (300자 내외)
      7. "proArguments": 찬성측 주요 논점 3가지 (배열)
      8. "conArguments": 반대측 주요 논점 3가지 (배열)
      9. "teacherTips": 교사용 지도 팁 (300자 내외)
      10. "keyQuestions": 학생들이 고려해야 할 핵심 질문 5개 (배열)
      11. "expectedOutcomes": 기대 학습 성과 4-5개 (배열, 학생들이 이 토론을 통해 얻게 될 역량)
      12. "materials": 토론에 필요한 준비물 목록 (배열)
      
      학생들의 사고력과 토론 능력을 향상시킬 수 있는 교육적으로 가치 있는 내용을 제공해 주세요.
      초등학생 수준에 맞게 이해하기 쉬운 내용으로 작성해 주세요.
      응답은 반드시 한국어로 작성해 주세요.
      
      만약 사용자가 학년이나 교과를 입력했다면, 그에 맞게 조정해 주세요.
      입력되지 않은 경우, 토론 주제에 가장 적합한 학년과 교과를 추천해 주세요.
    `;

    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    // AI 응답 파싱
    const content = response.choices[0].message.content;
    let scenarioData;
    
    try {
      scenarioData = JSON.parse(content || '{}');
    } catch (error) {
      console.error('JSON 파싱 오류:', content);
      return NextResponse.json(
        { error: 'AI 응답을 파싱하는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
    
    // 성공적인 응답 반환
    return NextResponse.json({
      success: true,
      data: scenarioData
    });
    
  } catch (error: any) {
    console.error('시나리오 생성 오류:', error);
    return NextResponse.json(
      { 
        error: '시나리오 생성 중 오류가 발생했습니다.',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 