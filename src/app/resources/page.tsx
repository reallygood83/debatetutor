'use client';

import React from 'react';
import Link from 'next/link';

// 자료 타입 정의
interface Resource {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

export default function ResourcesPage() {
  // 토론 규칙
  const debateRules: Resource = {
    id: 'rules',
    title: '토론 규칙 및 예절',
    description: '경기초등토론교육모형에서 권장하는 토론 규칙 및 예절입니다.',
    content: (
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">기본 규칙</h3>
        <ul className="list-disc ml-5 space-y-2">
          <li>상대방이 말할 때는 경청하고 끼어들지 않습니다.</li>
          <li>발언 시간을 지켜주세요.</li>
          <li>상대방의 의견을 존중하고, 인신공격을 하지 않습니다.</li>
          <li>감정적인 표현보다는 논리적인 근거를 바탕으로 의견을 제시합니다.</li>
          <li>다양한 의견을 수용하는 열린 마음을 가집니다.</li>
        </ul>
        
        <h3 className="font-semibold text-lg mt-4">토론 예절</h3>
        <ul className="list-disc ml-5 space-y-2">
          <li>상대방의 말을 주의 깊게 들으며 메모합니다.</li>
          <li>발언권을 얻은 후 말합니다.</li>
          <li>상대방의 발언 중에는 고개를 끄덕이거나 적절한 반응을 보여줍니다.</li>
          <li>상대방 의견의 좋은 점을 인정하고, 비판할 때는 예의를 갖춥니다.</li>
          <li>토론이 끝난 후에는 서로 격려하고 감사의 인사를 나눕니다.</li>
        </ul>
      </div>
    )
  };
  
  // 입론서 양식
  const argumentTemplate: Resource = {
    id: 'argument-template',
    title: '입론서 양식',
    description: '토론 준비를 위한 입론서 작성 양식입니다.',
    content: (
      <div className="space-y-3">
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold text-center mb-4 text-lg">입론서</h3>
          
          <div className="mb-4">
            <p className="font-semibold mb-1">토론 주제:</p>
            <div className="border-b border-dashed h-6"></div>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold mb-1">나의 입장: □ 찬성 □ 반대</p>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold mb-1">주장:</p>
            <div className="border-b border-dashed h-6"></div>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold mb-1">근거 1:</p>
            <div className="border-b border-dashed h-6"></div>
            <div className="border-b border-dashed h-6 mt-2"></div>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold mb-1">근거 2:</p>
            <div className="border-b border-dashed h-6"></div>
            <div className="border-b border-dashed h-6 mt-2"></div>
          </div>
          
          <div className="mb-4">
            <p className="font-semibold mb-1">근거 3:</p>
            <div className="border-b border-dashed h-6"></div>
            <div className="border-b border-dashed h-6 mt-2"></div>
          </div>
          
          <div>
            <p className="font-semibold mb-1">예상되는 반론과 그에 대한 대응:</p>
            <div className="border-b border-dashed h-6"></div>
            <div className="border-b border-dashed h-6 mt-2"></div>
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-600">* 이 양식은 A4 용지로 인쇄하여 사용할 수 있습니다.</p>
      </div>
    )
  };
  
  // 성찰 질문 목록
  const reflectionQuestions: Resource = {
    id: 'reflection-questions',
    title: '토론 후 성찰 질문',
    description: '토론 활동 후 학생들의 성찰을 돕는 질문 목록입니다.',
    content: (
      <div>
        <ul className="list-decimal ml-5 space-y-3">
          <li>토론 전과 비교하여 여러분의 생각이 어떻게 바뀌었나요?</li>
          <li>상대방의 의견 중 가장 설득력 있다고 생각한 부분은 무엇인가요?</li>
          <li>오늘 토론에서 가장 인상 깊었던 순간은 언제였나요?</li>
          <li>이번 토론을 통해 새롭게 알게 된 사실이나 관점은 무엇인가요?</li>
          <li>다양한 의견을 듣고 나서 절충안이나 새로운 해결책을 생각해볼 수 있나요?</li>
          <li>이 주제에 대해 더 알아보고 싶은 것이 있나요?</li>
          <li>다음 토론에서 더 잘하기 위해 개선하고 싶은 점은 무엇인가요?</li>
          <li>토론에서 배운 내용을 일상생활에 어떻게 적용할 수 있을까요?</li>
          <li>의견이 다른 사람들과 함께 살아가기 위해 필요한 태도는 무엇일까요?</li>
          <li>이 주제와 관련하여 우리 학급/학교/지역사회에서 할 수 있는 활동이 있을까요?</li>
        </ul>
      </div>
    )
  };
  
  // 후속 활동 아이디어
  const followUpActivities: Resource = {
    id: 'follow-up-activities',
    title: '토론 후속 활동 아이디어',
    description: '토론 주제에 대한 이해를 심화하고 실천으로 연결하는 후속 활동 아이디어입니다.',
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">성찰형 활동</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>토론 일기 쓰기: 토론 과정과 느낀 점을 정리</li>
            <li>마인드맵 만들기: 주제 관련 다양한 관점 시각화</li>
            <li>생각 변화 그래프: 토론 전/중/후 자신의 생각 변화 표현</li>
            <li>시나 시각 작품 만들기: 주제와 관련된 감정이나 생각 예술적 표현</li>
            <li>인터뷰: 주제에 대한 다양한 사람들의 의견 수집하기</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">사회 참여형 활동</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>캠페인 기획하기: 주제 관련 인식 개선 캠페인 계획 및 실행</li>
            <li>포스터/카드뉴스 만들기: 주제 관련 정보 시각적 표현</li>
            <li>문제 해결 프로젝트: 주제 관련 실제 문제 해결 위한 프로젝트</li>
            <li>편지쓰기: 관련 기관이나 인물에게 의견 전달하는 편지</li>
            <li>지역사회 봉사활동: 주제와 연계된 봉사활동 기획 및 참여</li>
          </ul>
        </div>
      </div>
    )
  };
  
  // 모든 자료 목록
  const resources: Resource[] = [
    debateRules,
    argumentTemplate,
    reflectionQuestions,
    followUpActivities
  ];
  
  // 현재 선택된 자료 ID (초기값: 첫 번째 자료)
  const [selectedResourceId, setSelectedResourceId] = React.useState(resources[0].id);
  
  // 선택된 자료 찾기
  const selectedResource = resources.find(resource => resource.id === selectedResourceId) || resources[0];
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">토론 자료</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* 자료 목록 사이드바 */}
        <div className="md:w-1/4">
          <nav className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul>
              {resources.map(resource => (
                <li key={resource.id} className="border-b last:border-b-0">
                  <button
                    onClick={() => setSelectedResourceId(resource.id)}
                    className={`w-full text-left p-4 transition-colors ${
                      selectedResourceId === resource.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    {resource.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
        
        {/* 선택된 자료 내용 */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">{selectedResource.title}</h2>
            <p className="text-gray-600 mb-6">{selectedResource.description}</p>
            
            <div className="border-t pt-4">
              {selectedResource.content}
            </div>
            
            {/* 인쇄 버튼 */}
            <div className="mt-8 text-right">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                인쇄하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 