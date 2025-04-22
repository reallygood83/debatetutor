import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '토론 튜터',
  description: '경기초등토론교육모형을 활용한 토론 교육 지원 도구',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 네비게이션 메뉴 항목
  const navItems = [
    { id: 'home', title: '홈', href: '/' },
    { id: 'scenarios', title: '시나리오', href: '/scenarios' },
    { id: 'session', title: '토론 진행', href: '/session' },
    { id: 'resources', title: '토론 자료', href: '/resources' }
  ];

  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <header className="bg-blue-700 text-white sticky top-0 z-50">
          <div className="container mx-auto py-6 px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">토론 튜터</h1>
            <p className="text-lg md:text-xl opacity-90">
              경기초등토론교육모형을 활용한 토론 교육 지원 도구
            </p>
          </div>
          
          {/* 네비게이션 메뉴 */}
          <div className="bg-white shadow-md">
            <div className="container mx-auto px-6">
              <nav className="flex flex-wrap items-center justify-start py-3">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="px-4 py-2 mx-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8 mt-4">
          {children}
        </main>
        
        {/* 푸터 */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="mb-2">© 2025 토론 튜터 - 초등 토론 교육 지원 도구</p>
              <p className="text-gray-400 text-sm">
                경기초등토론교육모형 기반 · 교실 토론 활동 지원 애플리케이션
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
