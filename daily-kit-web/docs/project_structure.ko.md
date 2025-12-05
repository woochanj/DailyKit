# 프로젝트 구조 문서 (Project Structure Documentation)

## 프로젝트 목적 (Project Purpose)
**DailyKit**은 사용자와 개발자에게 필수적인 유틸리티를 제공하기 위해 설계된 종합 웹 툴킷입니다. 사람들이 다양한 작업을 위해 매일 의존할 수 있는 "데일리 키트"가 되는 것을 목표로 합니다.
- **화면 테스트 (Screen Tests)**: 불량 화소(Dead Pixel), 번인(Burn-in) 등 디스플레이 문제를 확인하는 도구.
- **기기 테스트 (Device Tests)**: 키보드, 마우스, 게임패드 등 입력 장치의 기능을 검증하는 유틸리티.
- **개발자 도구 (Developer Tools)**: 개발자를 위한 도우미 모음 (예: JSON 포맷터).
- **블로그 (Blog)**: 업데이트 및 기술적 통찰을 공유하는 섹션.

## 개요 (Overview)
**DailyKit Web**은 React 19, Tailwind CSS 4, TypeScript로 구축된 Next.js 16 애플리케이션입니다. 국제화(i18n)를 위해 `next-intl`을 사용합니다.

## 디렉토리 구조 (Directory Layout)

### 루트 디렉토리 (Root Directory)
- **`app/`**: App Router 파일 시스템을 포함합니다.
    - `[locale]/`: 루트 레이아웃 및 페이지 (다국어 지원).
    - `globals.css`: 전역 스타일 및 CSS 변수.
- **`components/`**: React 컴포넌트들이며, 목적에 따라 엄격하게 분리되어 있습니다.
    - `features/`: 기능별 로직 및 UI (예: `device`, `home`, `tools`).
    - `layout/`: 전역 레이아웃 컴포넌트 (`Header`, `Footer`).
    - `ui/`: 재사용 가능한 UI 프리미티브 (`BentoCard` 등).
- **`i18n/`**: 국제화 설정 (`request.ts`, `routing.ts`).
- **`messages/`**: JSON 번역 파일 (`en.json`, `ko.json`).
- **`public/`**: 정적 자산 (이미지, 사운드).

### 주요 아키텍처 패턴 (Key Architectural Patterns)
1.  **관심사 분리 (Separation of Concerns)**:
    - `app/` 디렉토리는 오직 **라우팅**과 **메타데이터**만 처리합니다.
    - `components/features/`는 **비즈니스 로직**과 **UI 구현**을 담당합니다.
    - 모든 클라이언트 사이드 로직(`"use client"`)은 `components/features` 내에 위치해야 합니다.

2.  **국제화 (Internationalization - i18n)**:
    - `next-intl`을 사용합니다.
    - 모든 라우트는 `[locale]`로 감싸져 있습니다.
    - 텍스트 콘텐츠는 `messages/*.json`으로 추출되어야 합니다.

3.  **스타일링 (Styling)**:
    - **Tailwind CSS 4**가 주 스타일링 엔진입니다.
    - `globals.css`의 **CSS 변수**로 색상 테마를 정의합니다 (다크 모드 지원).
    - 메인 레이아웃에는 **Bento Grid** 디자인 시스템이 사용됩니다.

## 주요 파일 (Key Files)
- `package.json`: 의존성 및 스크립트.
- `middleware.ts`: 로케일 라우팅 및 리다이렉션 처리.
- `next.config.ts`: Next.js 설정.
