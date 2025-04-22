'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Scenario, Activity } from '@/types/scenario';
import { getScenarioById } from '@/utils/scenarioUtils';

// 타이머 컴포넌트
function Timer({ 
  initialMinutes, 
  onTimeEnd 
}: { 
  initialMinutes: number; 
  onTimeEnd: () => void;
}) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  
  // 타이머 포맷 함수
  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 타이머 토글
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  // 타이머 리셋
  const resetTimer = () => {
    setSeconds(initialMinutes * 60);
    setIsActive(false);
  };
  
  // 타이머 효과
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      setIsActive(false);
      if (onTimeEnd) onTimeEnd();
      // 타이머 종료 알림음 
      const audio = new Audio('/notification.mp3');
      audio.play().catch(e => console.error('알림음 재생 실패:', e));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onTimeEnd]);
  
  return (
    <div className="flex flex-col items-center">
      <div className={`text-4xl font-bold mb-3 ${seconds < 30 ? 'text-red-600' : 'text-blue-700'}`}>
        {formatTime()}
      </div>
      <div className="flex gap-2">
        <button
          onClick={toggleTimer}
          className={`px-3 py-1 rounded-md ${isActive ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
        >
          {isActive ? '일시정지' : '시작'}
        </button>
        <button
          onClick={resetTimer}
          className="px-3 py-1 bg-gray-500 text-white rounded-md"
        >
          리셋
        </button>
      </div>
    </div>
  );
}

export default function SessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get('scenarioId');
  
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showPrompts, setShowPrompts] = useState(false);
  
  // 현재 단계와 활동을 배열로 변환
  const getStagesAndActivities = useCallback(() => {
    if (!scenario) return { stages: [], currentActivity: null };
    
    const stages = Object.values(scenario.stages);
    let activityCounter = 0;
    let targetActivityIndex = 0;
    let targetStageIndex = 0;
    
    // 현재 활동 찾기
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      for (let j = 0; j < stage.activities.length; j++) {
        if (activityCounter === currentStageIndex * 100 + currentActivityIndex) {
          targetStageIndex = i;
          targetActivityIndex = j;
          break;
        }
        activityCounter++;
      }
    }
    
    const currentActivity = stages[targetStageIndex]?.activities[targetActivityIndex] || null;
    
    return { stages, currentActivity };
  }, [scenario, currentStageIndex, currentActivityIndex]);
  
  // 시나리오 로드
  useEffect(() => {
    const loadScenario = () => {
      if (!scenarioId) {
        alert('시나리오 ID가 필요합니다.');
        router.push('/scenarios');
        return;
      }
      
      try {
        const foundScenario = getScenarioById(scenarioId);
        if (foundScenario) {
          setScenario(foundScenario);
          setCurrentStageIndex(0);
          setCurrentActivityIndex(0);
        } else {
          alert('시나리오를 찾을 수 없습니다.');
          router.push('/scenarios');
        }
      } catch (error) {
        console.error('Failed to load scenario:', error);
        alert('시나리오를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    loadScenario();
  }, [scenarioId, router]);
  
  // 다음 활동으로 이동
  const handleNext = () => {
    const { stages } = getStagesAndActivities();
    
    // 현재 단계의 활동 수 확인
    const currentStage = stages[currentStageIndex];
    if (!currentStage) return;
    
    const isLastActivityInStage = currentActivityIndex >= currentStage.activities.length - 1;
    
    if (isLastActivityInStage) {
      // 다음 단계로 이동
      if (currentStageIndex < stages.length - 1) {
        setCurrentStageIndex(currentStageIndex + 1);
        setCurrentActivityIndex(0);
      } else {
        // 모든 활동 완료
        alert('모든 토론 활동이 완료되었습니다.');
      }
    } else {
      // 다음 활동으로 이동
      setCurrentActivityIndex(currentActivityIndex + 1);
    }
    
    // 다음 활동으로 이동 시 발문 숨기기
    setShowPrompts(false);
  };
  
  // 이전 활동으로 이동
  const handlePrevious = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(currentActivityIndex - 1);
    } else if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
      const previousStage = Object.values(scenario?.stages || {})[currentStageIndex - 1];
      if (previousStage) {
        setCurrentActivityIndex(previousStage.activities.length - 1);
      }
    }
    
    // 이전 활동으로 이동 시 발문 숨기기
    setShowPrompts(false);
  };
  
  // 타이머 종료 처리
  const handleTimeEnd = () => {
    alert('시간이 종료되었습니다.');
  };
  
  // 로딩 상태 표시
  if (loading) {
    return <div className="container mx-auto p-6 text-center">로딩 중...</div>;
  }
  
  // 시나리오가 없을 경우
  if (!scenario) {
    return <div className="container mx-auto p-6 text-center">시나리오를 찾을 수 없습니다.</div>;
  }
  
  const { stages, currentActivity } = getStagesAndActivities();
  if (!currentActivity) {
    return <div className="container mx-auto p-6 text-center">활동을 찾을 수 없습니다.</div>;
  }
  
  const currentStage = stages[currentStageIndex];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{scenario.title}</h1>
          <Link href="/scenarios" className="text-white hover:underline">
            종료
          </Link>
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="flex-grow container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* 상단 진행 정보 */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b">
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-1">{currentStage.title}</h2>
              <p className="text-gray-500">
                단계 {currentStageIndex + 1}/3 • 활동 {currentActivityIndex + 1}/{currentStage.activities.length}
              </p>
            </div>
            
            <Timer 
              initialMinutes={currentActivity.durationMinutes} 
              onTimeEnd={handleTimeEnd} 
            />
          </div>
          
          {/* 활동 정보 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-3">{currentActivity.title}</h3>
            <p className="text-lg mb-4">{currentActivity.description}</p>
            
            {/* 교사 발문 토글 */}
            <div className="mt-6">
              <button
                onClick={() => setShowPrompts(!showPrompts)}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <span>{showPrompts ? '교사 발문 숨기기' : '교사 발문 보기'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                  {showPrompts 
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  }
                </svg>
              </button>
              
              {showPrompts && (
                <div className="mt-3 p-4 bg-blue-50 rounded-md">
                  <h4 className="font-semibold mb-2">발문 예시:</h4>
                  <ul className="list-disc ml-5 space-y-1">
                    {currentActivity.teacherPrompts.map((prompt, index) => (
                      <li key={index}>{prompt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 이전/다음 버튼 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStageIndex === 0 && currentActivityIndex === 0}
            className={`px-4 py-2 rounded-md ${
              currentStageIndex === 0 && currentActivityIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            이전 활동
          </button>
          
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            다음 활동
          </button>
        </div>
      </main>
    </div>
  );
} 