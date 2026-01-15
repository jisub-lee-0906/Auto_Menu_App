# 오늘의 급식 (Auto Menu)

**오늘의 급식**은 영양가 있는 식단을 자동으로 생성해주는 스마트 급식 메뉴 생성기입니다.  
매일 무엇을 먹을지 고민하는 시간을 줄이고, 균형 잡힌 맛있는 식단을 제안받아보세요.

## 🔗 배포 주소 (Live Demo)

👉 **[https://auto-menu-app-omega.vercel.app/](https://auto-menu-app-omega.vercel.app/)**

## ✨ 주요 기능 (Features)

*   **🎲 랜덤 식단 생성**: 밥, 국, 메인 반찬, 보조 반찬, 김치, 후식까지 완벽한 한 끼 식단을 버튼 하나로 생성합니다.
*   **🔒 메뉴 잠금 모드**: 마음에 드는 메뉴는 자물쇠로 잠그고, 나머지 메뉴만 다시 돌려볼 수 있습니다.
*   **🔄 개별 새로고침**: 특정 반찬이 마음에 들지 않는다면? 해당 메뉴만 콕 집어 바꿀 수 있습니다.
*   **📸 이미지 저장**: 완성된 나만의 식단을 깔끔한 이미지 카드로 저장하여 공유할 수 있습니다.
*   **📋 텍스트 복사**: 식단 리스트를 텍스트로 복사하여 메신저나 메모장에 쉽게 공유하세요.
*   **📱 반응형 디자인**: 모바일과 데스크탑 어디서든 깔끔한 **Toss Style**의 UI를 경험할 수 있습니다.

## 🛠 기술 스택 (Tech Stack)

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Libraries**:
    *   `html2canvas`: 식단 이미지 저장 기능 구현
    *   `@vercel/analytics`, `@vercel/speed-insights`: 웹사이트 성능 및 사용자 분석
*   **Deployment**: [Vercel](https://vercel.com/)

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 1. 저장소 클론 (Clone)

```bash
git clone https://github.com/jisub-lee-0906/Auto_Menu_App.git
cd Auto_Menu_App
```

### 2. 패키지 설치 (Install Dependencies)

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. 개발 서버 실행 (Run Dev Server)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 👥 만든 사람들 (Credits)

*   **Development**: 이지섭
*   **Data Curation**: 문채영

---

> **Note**: 이 프로젝트는 학습 및 포트폴리오 목적으로 제작되었습니다.
