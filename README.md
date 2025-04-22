# 토론 튜터 (Debate Tutor)

초등학교 토론 교육을 위한 AI 기반 토론 시나리오 생성 및 관리 시스템입니다.

## 주요 기능

- **AI 기반 토론 시나리오 생성**: Google의 Gemini 2.0-flash 모델을 활용하여 교육적으로 가치 있는 토론 시나리오를 자동으로 생성합니다.
- **시나리오 저장 및 관리**: 생성된 시나리오를 로컬 스토리지나 MongoDB에 저장하고 관리할 수 있습니다.
- **토론 구성 요소 제공**: 토론 배경, 찬성/반대 입장, 교사 지도 노트, 핵심 질문, 기대 학습 성과 등 토론에 필요한 다양한 요소를 제공합니다.
- **맞춤형 시나리오**: 학년, 교과목에 맞는 토론 주제를 생성하고 관리할 수 있습니다.

## 기술 스택

- Frontend: Next.js, React, Tailwind CSS
- Backend: Next.js API Routes
- 데이터베이스: MongoDB
- AI: Google Gemini API (Gemini 2.0-flash)

## 설치 및 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/reallygood83/debatetutor.git
cd debatetutor
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.example` 파일을 `.env.local`로 복사하고 필요한 API 키와 설정을 입력합니다.
- Gemini API 키는 https://ai.google.dev/tutorials/setup 에서 생성할 수 있습니다.

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 `http://localhost:3000` 접속

## 프로젝트 구조

- `/src/app/api`: API 엔드포인트 (Gemini AI, MongoDB 연동)
- `/src/app/scenarios`: 시나리오 관리 관련 페이지
- `/src/models`: MongoDB 모델 정의
- `/src/types`: TypeScript 타입 정의
- `/src/utils`: 유틸리티 함수

## 라이선스

MIT 