'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScenarioFormData } from '@/types/scenario';
import { createNewScenario, saveScenario } from '@/utils/scenarioUtils';

export default function CreateScenarioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ScenarioFormData>({
    title: '',
    totalDurationMinutes: 90,
    groupCount: undefined
  });
  
  const [errors, setErrors] = useState<{
    title?: string;
    totalDurationMinutes?: string;
  }>({});
  
  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 숫자 필드인 경우 숫자로 변환
    if (name === 'totalDurationMinutes' || name === 'groupCount') {
      const numValue = parseInt(value);
      setFormData({
        ...formData,
        [name]: isNaN(numValue) ? '' : numValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    const newErrors: typeof errors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '토론 주제를 입력해주세요.';
    }
    
    if (!formData.totalDurationMinutes || formData.totalDurationMinutes < 10) {
      newErrors.totalDurationMinutes = '10분 이상의 시간을 입력해주세요.';
    }
    
    // 오류가 있으면 제출 중단
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // 새 시나리오 생성 및 저장
    try {
      const newScenario = createNewScenario(formData);
      saveScenario(newScenario);
      
      // 시나리오 목록 페이지로 이동
      router.push('/scenarios');
    } catch (error) {
      console.error('Failed to create scenario:', error);
      alert('시나리오 생성 중 오류가 발생했습니다.');
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">새 토론 시나리오 만들기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              토론 주제
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="예: 초등학교에 휴대폰을 가지고 와야 한다"
              className={`w-full p-3 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="totalDurationMinutes" className="block text-gray-700 font-medium mb-2">
              총 토론 시간 (분)
            </label>
            <input
              type="number"
              id="totalDurationMinutes"
              name="totalDurationMinutes"
              value={formData.totalDurationMinutes || ''}
              onChange={handleChange}
              min="10"
              max="300"
              className={`w-full p-3 border rounded-md ${errors.totalDurationMinutes ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.totalDurationMinutes && <p className="text-red-500 text-sm mt-1">{errors.totalDurationMinutes}</p>}
            <p className="text-gray-500 text-sm mt-1">경기초등토론교육모형의 3단계 활동에 맞게 시간이 자동 배분됩니다.</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="groupCount" className="block text-gray-700 font-medium mb-2">
              모둠 수 (선택 사항)
            </label>
            <input
              type="number"
              id="groupCount"
              name="groupCount"
              value={formData.groupCount || ''}
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="선택 사항"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/scenarios')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              시나리오 생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 