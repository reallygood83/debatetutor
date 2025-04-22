'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// 시나리오 타입 정의
interface Scenario {
  id: string;
  title: string;
  description: string;
  topic: string;
  grade: string;
  subject: string;
  createdAt: string;
  details?: {
    affirmative: string;
    negative: string;
    background: string;
    teacherNotes: string;
    materials: string[];
    expectedOutcomes: string[];
  };
}

// 폼 데이터 타입 정의
interface FormData {
  title: string;
  description: string;
  topic: string;
  grade: string;
  subject: string;
  affirmative: string;
  negative: string;
  background: string;
  teacherNotes: string;
  materials: string;
  expectedOutcomes: string;
}

// 예시 시나리오 데이터 (실제로는 API나 데이터 스토어에서 가져옴)
const exampleScenarios: Scenario[] = [
  {
    id: '1',
    title: '기초 연금 지급 대상 확대',
    description: '기초 연금 지급 대상을 확대하는 것의 찬반에 대해 토론합니다.',
    topic: '기초 연금 지급 대상 확대에 찬성한다 vs 반대한다',
    grade: '6학년',
    subject: '사회',
    createdAt: '2023-08-15',
    details: {
      affirmative: '기초 연금 지급 대상을 확대하면 더 많은 노인들에게 경제적 지원을 제공할 수 있다. 이는 노인 빈곤율을 낮추고 노인들의 삶의 질을 향상시키는 데 도움이 된다.',
      negative: '기초 연금 지급 대상을 확대하면 재정 부담이 커진다. 이는 미래 세대에게 더 큰 부담을 주며, 정부의 재정적 지속 가능성을 위협할 수 있다.',
      background: '현재 대한민국의 기초 연금은 만 65세 이상 노인 중 소득과 재산이 일정 기준 이하인 분들에게 지급되고 있습니다. 이 제도는 노인 빈곤 문제를 해결하기 위해 도입되었지만, 지급 대상과 금액에 대한 논쟁이 계속되고 있습니다.',
      teacherNotes: '이 토론은 복지 정책의 확대와 재정적 지속 가능성 사이의 균형에 대해 학생들이 생각해볼 수 있는 기회를 제공합니다. 학생들에게 양측의 주장을 모두 이해하고, 증거에 기반한 논증을 할 수 있도록 지도하세요.',
      materials: ['정부 복지 정책 관련 자료', '노인 빈곤율 통계 자료', '국가 재정 현황 자료', '인구 고령화 추세 자료'],
      expectedOutcomes: ['복지 정책의 목적과 효과에 대한 이해', '재정적 지속 가능성의 중요성 인식', '사회적 가치와 경제적 현실 사이의 균형 고려 능력', '증거 기반 논증 능력 향상']
    }
  },
  // 다른 시나리오들은 생략...
];

export default function ScenarioEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  
  // 폼 상태 관리
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    topic: '',
    grade: '',
    subject: '',
    affirmative: '',
    negative: '',
    background: '',
    teacherNotes: '',
    materials: '',
    expectedOutcomes: ''
  });
  
  // 유효성 검사 오류 상태
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    topic?: string;
    grade?: string;
    subject?: string;
  }>({});
  
  // 시나리오 데이터 로드
  useEffect(() => {
    // API 호출 대신 예시 데이터에서 시나리오 찾기
    const foundScenario = exampleScenarios.find(s => s.id === id);
    
    if (foundScenario) {
      setScenario(foundScenario);
      
      // 폼 데이터 초기화
      setFormData({
        title: foundScenario.title,
        description: foundScenario.description,
        topic: foundScenario.topic,
        grade: foundScenario.grade,
        subject: foundScenario.subject,
        affirmative: foundScenario.details?.affirmative || '',
        negative: foundScenario.details?.negative || '',
        background: foundScenario.details?.background || '',
        teacherNotes: foundScenario.details?.teacherNotes || '',
        materials: foundScenario.details?.materials?.join('\n') || '',
        expectedOutcomes: foundScenario.details?.expectedOutcomes?.join('\n') || ''
      });
    }
    
    setLoading(false);
  }, [id]);
  
  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    const newErrors: typeof errors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '시나리오 제목을 입력해주세요.';
    }
    
    if (!formData.topic.trim()) {
      newErrors.topic = '토론 주제를 입력해주세요.';
    }
    
    if (!formData.grade.trim()) {
      newErrors.grade = '학년을 선택해주세요.';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = '교과를 입력해주세요.';
    }
    
    // 오류가 있으면 제출 중단
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // 실제로는 API를 통해 데이터 저장
    // 여기서는 저장 성공 가정하고 상세 페이지로 이동
    alert('시나리오가 성공적으로 수정되었습니다.');
    router.push(`/scenarios/${id}`);
  };
  
  // 로딩 상태 표시
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-xl text-blue-700">로딩 중...</div>
      </div>
    );
  }
  
  // 시나리오를 찾지 못한 경우
  if (!scenario) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">시나리오를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-6">요청하신 시나리오가 존재하지 않거나 삭제되었을 수 있습니다.</p>
            <Link href="/scenarios">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow transition-colors">
                시나리오 목록으로 돌아가기
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold">시나리오 수정</h1>
          <p className="mt-2 text-blue-100">토론 시나리오 정보를 수정합니다.</p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* 기본 정보 섹션 */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4">기본 정보</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    시나리오 제목
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                
                <div>
                  <label htmlFor="topic" className="block text-gray-700 font-medium mb-2">
                    토론 주제
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="예: 인공지능은 인간의 일자리를 빼앗는다 vs 새로운 일자리를 만든다"
                    className={`w-full p-3 border rounded-md ${errors.topic ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  시나리오 설명
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="grade" className="block text-gray-700 font-medium mb-2">
                    대상 학년
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md ${errors.grade ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">학년 선택</option>
                    <option value="1학년">1학년</option>
                    <option value="2학년">2학년</option>
                    <option value="3학년">3학년</option>
                    <option value="4학년">4학년</option>
                    <option value="5학년">5학년</option>
                    <option value="6학년">6학년</option>
                    <option value="3-4학년">3-4학년</option>
                    <option value="5-6학년">5-6학년</option>
                    <option value="1-6학년">전체 학년</option>
                  </select>
                  {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    관련 교과
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="예: 사회, 도덕"
                    className={`w-full p-3 border rounded-md ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>
              </div>
            </div>
            
            {/* 토론 내용 섹션 */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4">토론 내용</h2>
              
              <div className="mb-4">
                <label htmlFor="background" className="block text-gray-700 font-medium mb-2">
                  토론 배경
                </label>
                <textarea
                  id="background"
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="토론 주제에 대한 배경 정보와 맥락을 설명해주세요."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="affirmative" className="block text-gray-700 font-medium mb-2">
                    찬성 입장
                  </label>
                  <textarea
                    id="affirmative"
                    name="affirmative"
                    value={formData.affirmative}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="찬성 측의 주요 주장과 근거를 작성해주세요."
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="negative" className="block text-gray-700 font-medium mb-2">
                    반대 입장
                  </label>
                  <textarea
                    id="negative"
                    name="negative"
                    value={formData.negative}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="반대 측의 주요 주장과 근거를 작성해주세요."
                  ></textarea>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="teacherNotes" className="block text-gray-700 font-medium mb-2">
                  교사 지도 노트
                </label>
                <textarea
                  id="teacherNotes"
                  name="teacherNotes"
                  value={formData.teacherNotes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="토론 진행 시 교사가 참고할 수 있는 지도 노트를 작성해주세요."
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="materials" className="block text-gray-700 font-medium mb-2">
                  준비물 (각 항목을 줄바꿈으로 구분)
                </label>
                <textarea
                  id="materials"
                  name="materials"
                  value={formData.materials}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="예시:&#10;토론 주제 관련 뉴스 기사&#10;토론 규칙 안내문&#10;타이머"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="expectedOutcomes" className="block text-gray-700 font-medium mb-2">
                  기대 학습 성과 (각 항목을 줄바꿈으로 구분)
                </label>
                <textarea
                  id="expectedOutcomes"
                  name="expectedOutcomes"
                  value={formData.expectedOutcomes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="예시:&#10;비판적 사고력 향상&#10;논리적 표현력 신장&#10;다양한 관점 이해 능력 함양"
                ></textarea>
              </div>
            </div>
            
            {/* 버튼 영역 */}
            <div className="flex justify-between mt-8">
              <Link href={`/scenarios/${id}`}>
                <button type="button" className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 shadow transition-colors">
                  취소
                </button>
              </Link>
              
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow transition-colors"
              >
                변경사항 저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 