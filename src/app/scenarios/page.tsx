'use client';

import React, { useState } from 'react';
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
}

// 예시 시나리오 데이터
const exampleScenarios: Scenario[] = [
  {
    id: '1',
    title: '기초 연금 지급 대상 확대',
    description: '기초 연금 지급 대상을 확대하는 것의 찬반에 대해 토론합니다.',
    topic: '기초 연금 지급 대상 확대에 찬성한다 vs 반대한다',
    grade: '6학년',
    subject: '사회',
    createdAt: '2023-08-15'
  },
  {
    id: '2',
    title: '인공지능 창작물의 저작권',
    description: '인공지능이 만든 작품의 저작권은 누구에게 있는지 토론합니다.',
    topic: '인공지능 창작물의 저작권은 AI에게 있다 vs 인간에게 있다',
    grade: '5-6학년',
    subject: '실과, 사회',
    createdAt: '2023-09-03'
  },
  {
    id: '3',
    title: '학교 교복 착용 의무화',
    description: '초등학교에서 교복 착용을 의무화하는 것에 대한 찬반 토론입니다.',
    topic: '초등학교 교복 착용 의무화에 찬성한다 vs 반대한다',
    grade: '5학년',
    subject: '사회',
    createdAt: '2023-07-20'
  },
  {
    id: '4',
    title: '청소년 스마트폰 사용 시간 제한',
    description: '청소년의 스마트폰 사용 시간에 제한을 두어야 하는지에 대한 토론입니다.',
    topic: '청소년 스마트폰 사용 시간 제한에 찬성한다 vs 반대한다',
    grade: '4-6학년',
    subject: '도덕, 사회',
    createdAt: '2023-09-10'
  },
  {
    id: '5',
    title: '재활용 분리수거 의무화',
    description: '모든 가정에서 재활용 분리수거를 의무적으로 해야 하는지에 대한 토론입니다.',
    topic: '재활용 분리수거 의무화에 찬성한다 vs 반대한다',
    grade: '3-4학년',
    subject: '과학, 사회',
    createdAt: '2023-08-28'
  }
];

export default function ScenariosPage() {
  const [scenarios, setScenarios] = useState<Scenario[]>(exampleScenarios);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  // 검색 및 필터링 적용
  const filteredScenarios = scenarios.filter(scenario => {
    const matchesSearch = scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scenario.topic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = filterGrade === '' || scenario.grade.includes(filterGrade);
    const matchesSubject = filterSubject === '' || scenario.subject.includes(filterSubject);
    
    return matchesSearch && matchesGrade && matchesSubject;
  });

  // 시나리오 삭제 함수
  const handleDelete = (id: string) => {
    if (window.confirm('정말 이 시나리오를 삭제하시겠습니까?')) {
      setScenarios(scenarios.filter(scenario => scenario.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold">토론 시나리오</h1>
          <p className="mt-2 text-blue-100">토론 시나리오를 생성하고 관리합니다.</p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto py-8 px-4">
        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
            <div className="flex-grow">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">검색</label>
              <input
                type="text"
                id="search"
                placeholder="시나리오 제목, 설명 또는 토픽 검색..."
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">학년 필터</label>
              <select
                id="grade"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
              >
                <option value="">모든 학년</option>
                <option value="1">1학년</option>
                <option value="2">2학년</option>
                <option value="3">3학년</option>
                <option value="4">4학년</option>
                <option value="5">5학년</option>
                <option value="6">6학년</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">교과 필터</label>
              <select
                id="subject"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                <option value="">모든 교과</option>
                <option value="국어">국어</option>
                <option value="사회">사회</option>
                <option value="도덕">도덕</option>
                <option value="과학">과학</option>
                <option value="실과">실과</option>
              </select>
            </div>
            <Link href="/scenarios/create" className="w-full md:w-auto">
              <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition-colors">
                + 새 시나리오 생성
              </button>
            </Link>
          </div>
        </div>

        {/* 시나리오 목록 */}
        {filteredScenarios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredScenarios.map(scenario => (
              <div key={scenario.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h2 className="text-xl font-bold text-blue-800">{scenario.title}</h2>
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md mr-2">
                        {scenario.grade}
                      </span>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        {scenario.subject}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{scenario.description}</p>
                  
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-1">토론 주제</h3>
                    <p className="text-gray-700">{scenario.topic}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-sm text-gray-500">생성일: {scenario.createdAt}</span>
                    
                    <div className="flex mt-4 sm:mt-0 space-x-3">
                      <Link href={`/session?id=${scenario.id}`}>
                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors shadow-sm">
                          토론 시작
                        </button>
                      </Link>
                      <Link href={`/scenarios/${scenario.id}`}>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm">
                          세부 정보
                        </button>
                      </Link>
                      <Link href={`/scenarios/edit/${scenario.id}`}>
                        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors shadow-sm">
                          수정
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(scenario.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors shadow-sm"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-6">검색어나 필터를 변경하거나 새 시나리오를 만들어보세요.</p>
            <Link href="/scenarios/create">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow transition-colors">
                새 시나리오 생성
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 