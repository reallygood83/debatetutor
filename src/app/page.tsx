import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-indigo-100 to-white">
      <div className="flex flex-col items-center max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-indigo-800 mb-6">
          토론 튜터
        </h1>
        <p className="text-xl text-gray-700 mb-10">
          초등학교 토론 교육을 위한 혁신적인 AI 지원 플랫폼
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">시나리오 라이브러리</h2>
            <p className="text-gray-600 mb-4">
              다양한 주제의 토론 시나리오를 탐색하고 교육 과정에 활용해보세요.
            </p>
            <Link 
              href="/scenarios" 
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              시나리오 보기
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">AI 시나리오 생성</h2>
            <p className="text-gray-600 mb-4">
              원하는 주제로 맞춤형 토론 시나리오를 AI를 통해 자동으로 생성해보세요.
            </p>
            <Link 
              href="/scenarios/create" 
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              시나리오 만들기
            </Link>
          </div>
        </div>
        
        <div className="text-gray-600 max-w-2xl">
          <p>
            토론 튜터는 초등학교 교사들이 효과적인 토론 수업을 설계하고 운영할 수 있도록 돕는 플랫폼입니다.
            Gemini AI를 활용한 맞춤형 시나리오 생성과 단계별 토론 가이드를 통해 
            학생들의 비판적 사고력과 의사소통 능력을 향상시켜 보세요.
          </p>
        </div>
      </div>
    </main>
  );
} 