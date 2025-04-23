'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getScenarioById, deleteScenario } from '@/utils/scenarioUtils';

// 시나리오 타입 정의 (scenarios 페이지와 동일한 타입)
interface Scenario {
  id: string;
  title: string;
  description?: string;
  topic?: string;
  grade?: string;
  subject?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  totalDurationMinutes?: number;
  stages?: any;
  details?: {
    affirmative?: string;
    negative?: string;
    background?: string;
    teacherNotes?: string;
    materials?: string[];
    expectedOutcomes?: string[];
  };
}

// MongoDB에서 가져온 시나리오 타입
interface ServerScenario {
  _id: string;
  title: string;
  description?: string;
  topic?: string;
  grade?: string;
  subject?: string;
  totalDurationMinutes?: number;
  createdAt: string;
  updatedAt: string;
  stages?: any;
  scenarioDetails?: {
    background?: string;
    proArguments?: string[];
    conArguments?: string[];
    teacherTips?: string;
    keyQuestions?: string[];
    materials?: string[];
    expectedOutcomes?: string[];
  };
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
  {
    id: '2',
    title: '인공지능 창작물의 저작권',
    description: '인공지능이 만든 작품의 저작권은 누구에게 있는지 토론합니다.',
    topic: '인공지능 창작물의 저작권은 AI에게 있다 vs 인간에게 있다',
    grade: '5-6학년',
    subject: '실과, 사회',
    createdAt: '2023-09-03',
    details: {
      affirmative: '인공지능 스스로 학습하고 창작물을 만들었기 때문에, 그 저작권은 인공지능에게 있어야 한다. 이는 자율적인 창작 과정을 인정하는 것이다.',
      negative: '인공지능은 인간이 개발하고 학습시킨 도구일 뿐이다. 따라서 인공지능 창작물의 저작권은 인공지능을 개발하거나 사용한 인간에게 있어야 한다.',
      background: '최근 인공지능 기술이 발전하면서 AI가 그림, 음악, 글 등 다양한 창작물을 만들어내고 있습니다. 이에 따라 AI 창작물의 저작권이 누구에게 있는지에 대한 논쟁이 일어나고 있습니다.',
      teacherNotes: '이 토론은 기술 발전에 따른 법적, 윤리적 문제에 대해 생각해볼 수 있는 주제입니다. 학생들에게 창작과 저작권의 기본 개념을 이해시키고, 인공지능의 특성을 고려한 토론을 유도하세요.',
      materials: ['저작권법 관련 자료', '인공지능 창작물 사례', '인공지능 개발 과정 설명 자료'],
      expectedOutcomes: ['저작권의 개념과 중요성 이해', '인공지능과 인간 창작의 차이점 인식', '기술 발전에 따른 법적 문제 고찰 능력', '창의적 사고와 논리적 표현 능력 향상']
    }
  },
  {
    id: '3',
    title: '학교 교복 착용 의무화',
    description: '초등학교에서 교복 착용을 의무화하는 것에 대한 찬반 토론입니다.',
    topic: '초등학교 교복 착용 의무화에 찬성한다 vs 반대한다',
    grade: '5학년',
    subject: '사회',
    createdAt: '2023-07-20',
    details: {
      affirmative: '초등학교에서 교복 착용을 의무화하면 학생들 간의 옷차림 경쟁을 줄이고 소속감을 높일 수 있다. 또한 매일 아침 옷을 고르는 시간을 절약할 수 있다.',
      negative: '초등학교 학생들은 자신의 개성을 표현할 자유가 있다. 교복 의무화는 이러한 자유를 제한하고 추가적인 경제적 부담을 가정에 줄 수 있다.',
      background: '일부 초등학교에서는 교복 착용을 의무화하고 있으며, 이에 대한 찬반 의견이 분분합니다. 교복의 필요성과 학생의 자유 사이에서 어떤 선택이 더 바람직한지 토론해봅시다.',
      teacherNotes: '이 토론은 규칙과 자유, 개인과 집단의 관계에 대해 생각해볼 수 있는 주제입니다. 학생들의 일상과 밀접한 관련이 있어 참여도가 높을 수 있습니다.',
      materials: ['다양한 학교 교복 정책 사례', '학생 복장과 학교 규칙에 관한 자료'],
      expectedOutcomes: ['규칙과 자유의 균형에 대한 이해', '다양한 관점에서 문제를 바라보는 능력', '자신의 의견을 논리적으로 표현하는 능력']
    }
  },
  {
    id: '4',
    title: '청소년 스마트폰 사용 시간 제한',
    description: '청소년의 스마트폰 사용 시간에 제한을 두어야 하는지에 대한 토론입니다.',
    topic: '청소년 스마트폰 사용 시간 제한에 찬성한다 vs 반대한다',
    grade: '4-6학년',
    subject: '도덕, 사회',
    createdAt: '2023-09-10',
    details: {
      affirmative: '청소년의 과도한 스마트폰 사용은 학업 방해, 수면 부족, 중독 등의 문제를 일으킨다. 따라서 사용 시간 제한은 건강하고 균형 잡힌 생활을 위해 필요하다.',
      negative: '스마트폰 사용 시간 제한은 청소년의 자율성과 책임감 발달을 저해한다. 교육과 소통을 통해 스스로 조절할 수 있는 능력을 기르는 것이 더 중요하다.',
      background: '디지털 기기 사용이 일상화된 현대 사회에서 청소년들의 스마트폰 사용 시간과 그 제한에 관한 논쟁이 계속되고 있습니다. 이는 디지털 리터러시와 자기 조절 능력 발달과도 관련이 있습니다.',
      teacherNotes: '이 토론은 디지털 시대의 적응과 균형에 관한 주제입니다. 학생들이 자신의 경험을 바탕으로 의견을 형성하되, 감정적 주장보다는 근거에 기반한 논증을 할 수 있도록 지도하세요.',
      materials: ['청소년 스마트폰 사용 통계', '디지털 기기 사용이 뇌 발달에 미치는 영향 연구', '다양한 국가의 청소년 디지털 기기 정책'],
      expectedOutcomes: ['디지털 시민성 개념 이해', '자기 조절과 외부 규제의 장단점 분석 능력', '타인의 관점을 존중하며 토론하는 태도', '근거에 기반한 의사 결정 능력']
    }
  },
  {
    id: '5',
    title: '재활용 분리수거 의무화',
    description: '모든 가정에서 재활용 분리수거를 의무적으로 해야 하는지에 대한 토론입니다.',
    topic: '재활용 분리수거 의무화에 찬성한다 vs 반대한다',
    grade: '3-4학년',
    subject: '과학, 사회',
    createdAt: '2023-08-28',
    details: {
      affirmative: '재활용 분리수거 의무화는 환경 보호에 기여하고 자원을 절약한다. 모든 사람이 참여할 때 더 큰 효과를 볼 수 있으므로 의무화가 필요하다.',
      negative: '재활용 분리수거는 개인의 선택이어야 한다. 의무화보다는 교육과 인센티브를 통해 자발적 참여를 유도하는 것이 더 효과적이다.',
      background: '환경 문제가 심각해지면서 재활용의 중요성이 커지고 있습니다. 일부 국가와 지역에서는 재활용 분리수거를 법적으로 의무화하고 있는 반면, 다른 곳에서는 개인의 자율에 맡기고 있습니다.',
      teacherNotes: '이 토론은 환경 보호와 개인의 책임에 관한 주제입니다. 학생들에게 환경 문제의 심각성과 개인 행동의 중요성을 인식시키되, 다양한 관점에서 문제를 바라볼 수 있도록 지도하세요.',
      materials: ['환경 오염 및 재활용 관련 통계', '다양한 국가의 재활용 정책 사례', '재활용 과정 설명 자료'],
      expectedOutcomes: ['환경 보호의 중요성 인식', '개인 행동과 사회적 영향의 관계 이해', '의무와 자율의 균형에 대한 고찰', '지속 가능한 생활 방식에 대한 인식 확대']
    }
  }
];

export default function ScenarioDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadScenario() {
      setLoading(true);
      setError(null);

      try {
        // 1. 로컬 스토리지에서 시나리오 찾기
        const localScenario = getScenarioById(id);
        if (localScenario) {
          setScenario(localScenario);
          setLoading(false);
          return;
        }

        // 2. 로컬 예시 데이터에서 시나리오 찾기
        const exampleScenario = exampleScenarios.find(s => s.id === id);
        if (exampleScenario) {
          setScenario(exampleScenario);
          setLoading(false);
          return;
        }

        // 3. 서버에서 시나리오 불러오기
        const response = await fetch(`/api/scenarios-new/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('시나리오를 찾을 수 없습니다.');
          }
          throw new Error('서버에서 시나리오를 불러오는 중 오류가 발생했습니다.');
        }
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || '서버 응답 오류');
        }
        
        // MongoDB 데이터 형식을 Scenario 형식으로 변환
        const serverData: ServerScenario = result.data;
        const formattedScenario: Scenario = {
          id: serverData._id,
          title: serverData.title,
          description: serverData.description || '',
          topic: serverData.topic || '',
          grade: serverData.grade || '',
          subject: serverData.subject || '',
          createdAt: new Date(serverData.createdAt),
          updatedAt: new Date(serverData.updatedAt),
          totalDurationMinutes: serverData.totalDurationMinutes,
          stages: serverData.stages,
          details: {
            background: serverData.scenarioDetails?.background || '',
            affirmative: serverData.scenarioDetails?.proArguments?.join('\n\n') || '',
            negative: serverData.scenarioDetails?.conArguments?.join('\n\n') || '',
            teacherNotes: serverData.scenarioDetails?.teacherTips || '',
            materials: serverData.scenarioDetails?.materials || [],
            expectedOutcomes: serverData.scenarioDetails?.expectedOutcomes || []
          }
        };
        
        setScenario(formattedScenario);
      } catch (err: any) {
        console.error('시나리오 로드 오류:', err);
        setError(err.message || '시나리오를 불러오는 중 오류가 발생했습니다.');
        setScenario(null);
      } finally {
        setLoading(false);
      }
    }
    
    loadScenario();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('정말 이 시나리오를 삭제하시겠습니까?')) {
      return;
    }
    
    try {
      if (id.startsWith('local_') || exampleScenarios.some(s => s.id === id)) {
        // 로컬 시나리오 삭제
        deleteScenario(id);
      } else {
        // 서버 시나리오 삭제
        const response = await fetch(`/api/scenarios-new/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('시나리오 삭제 중 오류가 발생했습니다.');
        }
      }
      
      router.push('/scenarios');
    } catch (err: any) {
      console.error('시나리오 삭제 오류:', err);
      alert(err.message || '시나리오 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-xl text-blue-700">로딩 중...</div>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">시나리오를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-6">{error || '요청하신 시나리오가 존재하지 않거나 삭제되었을 수 있습니다.'}</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{scenario.title}</h1>
              <p className="mt-2 text-blue-100">{scenario.description}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link href={`/session?id=${scenario.id}`}>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors shadow-sm">
                  토론 시작
                </button>
              </Link>
              <Link href={`/scenarios/edit/${scenario.id}`}>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors shadow-sm">
                  수정
                </button>
              </Link>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors shadow-sm"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 시나리오 기본 정보 */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4">기본 정보</h2>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-500 mb-1">주제</div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-gray-800">{scenario.topic}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">학년</div>
                  <div className="bg-gray-100 p-2 rounded-md text-gray-800">
                    {scenario.grade}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">교과</div>
                  <div className="bg-gray-100 p-2 rounded-md text-gray-800">
                    {scenario.subject}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">생성일</div>
                <div className="text-gray-800">
                  {typeof scenario.createdAt === 'string' 
                    ? scenario.createdAt
                    : scenario.createdAt.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
            
            {scenario.details?.materials && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">준비물</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {scenario.details.materials.map((material, index) => (
                    <li key={index} className="text-gray-700">{material}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* 토론 세부 내용 */}
          <div className="md:col-span-2">
            {scenario.details && (
              <>
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">토론 배경</h2>
                  <p className="text-gray-700 whitespace-pre-line">{scenario.details.background}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-green-800 mb-4">찬성 입장</h2>
                    <p className="text-gray-700 whitespace-pre-line">{scenario.details.affirmative}</p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-red-800 mb-4">반대 입장</h2>
                    <p className="text-gray-700 whitespace-pre-line">{scenario.details.negative}</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg shadow p-6 mb-6">
                  <h2 className="text-xl font-bold text-yellow-800 mb-4">교사 지도 노트</h2>
                  <p className="text-gray-700 whitespace-pre-line">{scenario.details.teacherNotes}</p>
                </div>
                
                {scenario.details.expectedOutcomes && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-blue-800 mb-4">기대 학습 성과</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {scenario.details.expectedOutcomes.map((outcome, index) => (
                        <li key={index} className="text-gray-700">{outcome}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/scenarios">
            <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 shadow transition-colors">
              시나리오 목록으로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 