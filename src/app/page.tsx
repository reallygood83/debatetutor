'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  // 애플리케이션의 주요 기능 목록
  const features = [
    {
      id: 'scenarios',
      title: '토론 시나리오',
      description: '다양한 주제의 토론 시나리오를 만들고 관리합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: '/scenarios',
      color: 'blue'
    },
    {
      id: 'session',
      title: '토론 진행',
      description: '시나리오에 따라 토론을 진행하고 시간을 관리합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/session',
      color: 'green'
    },
    {
      id: 'resources',
      title: '토론 자료',
      description: '토론 규칙, 입론서, 성찰 질문 등 유용한 자료를 제공합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      link: '/resources',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 헤더 섹션 */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto py-8 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">토론 튜터</h1>
          <p className="text-xl md:text-2xl opacity-90">
            경기초등토론교육모형을 활용한 토론 교육 지원 도구
          </p>
        </div>
      </div>
      
      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-6 py-12">
        {/* 소개 섹션 */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">토론 튜터란?</h2>
            <p className="text-lg mb-6">
              토론 튜터는 교사들이 초등학교 교실에서 체계적인 토론 수업을 진행할 수 있도록 
              도와주는 도구입니다. 경기초등토론교육모형을 기반으로 하며, 토론 시나리오 관리부터 
              실시간 토론 진행 및 시간 관리까지 토론 교육에 필요한 모든 기능을 제공합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-blue-700">교사를 위한 기능</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>토론 시나리오 생성 및 관리</li>
                  <li>단계별 활동 시간 설정</li>
                  <li>토론 진행 중 타이머 관리</li>
                  <li>교사 안내용 프롬프트 제공</li>
                  <li>토론 자료 및 양식 다운로드</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-green-700">학생들의 역량 개발</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>비판적 사고력 향상</li>
                  <li>논리적 표현력 신장</li>
                  <li>경청 및 상호 존중 태도 함양</li>
                  <li>다양한 관점에서의 사고 확장</li>
                  <li>사회적 이슈에 대한 인식 제고</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* 주요 기능 섹션 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(feature => (
              <Link key={feature.id} href={feature.link}>
                <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full flex flex-col border-t-4 border-${feature.color}-500`}>
                  <div className={`text-${feature.color}-500 mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{feature.description}</p>
                  <div className={`text-${feature.color}-600 font-medium flex items-center`}>
                    자세히 보기
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* 시작하기 섹션 */}
        <section>
          <div className="bg-blue-700 text-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">지금 시작해보세요!</h2>
            <p className="text-xl mb-8 opacity-90">
              토론 시나리오를 만들고 교실에서 바로 활용할 수 있습니다.
            </p>
            <Link href="/scenarios/create">
              <button className="bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-50 transition-colors shadow-md">
                시나리오 만들기
              </button>
            </Link>
          </div>
        </section>
      </div>
      
      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="mb-2">© 2023 토론 튜터 - 초등 토론 교육 지원 도구</p>
            <p className="text-gray-400 text-sm">
              경기초등토론교육모형 기반 · 교실 토론 활동 지원 애플리케이션
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 