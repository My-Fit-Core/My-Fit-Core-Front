# My-Fit-Core-Front

MAPIKO(마피코)는 AI 기반 패션 스타일링 및 디지털 옷장 서비스입니다. 이 저장소는 모바일 우선 React 웹 앱의 개발 기반이며, 향후 Flutter WebView 연동을 고려합니다. 현재는 공통 컴포넌트와 실제 서비스 화면을 구현하지 않은 초기 세팅입니다. 페이지 개발 목표일은 2026년 12월 2일입니다.

- 저장소: https://github.com/My-Fit-Core/My-Fit-Core-Front.git
- Figma: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-5 (File Key `XhhPLJSwkdCMAJgzqFLELf`, Node ID `2:5`)

## 실행 환경과 기술 스택

Node.js 22.12 이상, npm 10 이상을 사용합니다. 초기 세팅 검증 환경은 Node.js 22.19.0, npm 10.9.3입니다. React, React Router, Vite, TypeScript, Tailwind CSS, ESLint, Prettier를 사용합니다. 정확한 전체 버전은 `package-lock.json`을 기준으로 합니다.

```bash
npm ci
npm run dev
```

개발 서버가 출력한 로컬 주소로 접속합니다. 배포 빌드는 `npm run build`, 결과 확인은 `npm run preview`를 사용합니다.

## 폴더 역할

- `src/pages/`: 경로별 페이지. 현재 파일은 경로 확인용 최소 표시만 포함합니다.
- `src/components/common/`: 공통 컴포넌트 담당자 소유 영역. 디자인 시스템과 공통 Props가 확정되면 구현합니다.
- `src/components/{layout,onboarding,home,closet,calendar,feed,mypage}/`: 도메인별 컴포넌트 영역.
- `src/routes/`: 라우트 정의. `src/App.tsx`에서 연결합니다.
- `src/styles/global.css`: Tailwind CSS 진입점과 전역 스타일. `src/styles/tokens.css`: 확정된 디자인 토큰의 향후 위치. 페이지 스타일에는 Tailwind 유틸리티 클래스를 사용합니다.
- `src/assets/{fonts,icons,images}/`: 승인된 에셋. `public/`: 번들 처리가 필요 없는 정적 파일.
- `src/apis/`, `src/hooks/`, `src/types/`, `src/constants/`, `src/mocks/`, `src/utils/`: 각 이름에 해당하는 공유 코드.
- `.vscode/`: 공통 에디터 설정과 권장 확장 프로그램.

빈 폴더의 `.gitkeep`은 실제 파일이 생기면 제거할 수 있습니다.

## 환경변수

`.env.example`을 `.env.local`로 복사하고 필요한 경우 `VITE_API_BASE_URL`에 확정된 API 주소를 넣습니다. API 주소가 아직 정해지지 않았으므로 기본값은 비어 있습니다. `VITE_`로 시작하는 변수는 브라우저 코드에 노출될 수 있으므로 비밀키, 토큰, 개인 정보를 넣지 마세요. `.env.local`은 Git에서 제외됩니다. API 명세가 공유되기 전에는 엔드포인트를 추측해 구현하지 않습니다.

## npm 명령어

| 명령어                 | 역할                      |
| ---------------------- | ------------------------- |
| `npm run dev`          | 개발 서버                 |
| `npm run build`        | 타입 검사와 프로덕션 빌드 |
| `npm run preview`      | 빌드 결과 미리보기        |
| `npm run lint`         | ESLint 검사               |
| `npm run lint:fix`     | ESLint 자동 수정          |
| `npm run format`       | Prettier 전체 포맷팅      |
| `npm run format:check` | Prettier 검사             |
| `npm run typecheck`    | TypeScript 타입 검사      |

## 개발 규칙

TypeScript strict 모드를 유지합니다. 저장 시 Prettier와 ESLint를 적용하며, 2칸 들여쓰기·세미콜론·작은따옴표·100자 줄 길이 등의 규칙은 `.prettierrc`를 따릅니다. `@/`는 `src/`를 가리킵니다. 새 페이지는 해당 `src/pages/` 디렉터리에 작성하고 `src/routes/AppRoutes.tsx`에 경로를 추가합니다. 현재 `/`는 `/home`으로 이동하며 `/login`, `/onboarding`, `/home`, `/closet`, `/calendar`, `/feed`, `/mypage`와 Not Found 경로가 준비되어 있습니다. 인증 흐름과 공통 레이아웃은 추후 결정합니다.

공통 UI(Button, Input, Modal, Chip, AppBar, BottomNavigation, Typography 등)는 별도 담당자가 구현합니다. 페이지 개발자는 기존 공통 컴포넌트의 Props와 토큰을 먼저 확인하고 재사용합니다. 담당자와 합의 없이 공통 Props나 디자인 토큰을 변경하거나 유사 컴포넌트를 중복 구현하지 않습니다.

Figma를 UI 구현 기준으로 사용합니다. 실제 페이지 개발 전에 해당 페이지의 구체적인 Frame/Node ID를 확인하고, 접근 가능한 경우 Figma MCP로 레이아웃·컴포넌트·토큰·타이포그래피·에셋을 분석합니다. 디자인을 임의로 재해석하지 않습니다. 접근이 불가능하거나 정보가 불명확하면 추측해 구현하지 않고 필요한 정보를 확인합니다. 이번 초기 세팅에서는 Figma 화면을 구현하지 않았습니다.

`BrowserRouter`를 사용하므로 배포 서버는 새로고침과 직접 URL 접속 시 `index.html`로 돌아오는 SPA fallback이 필요합니다. Flutter WebView의 URL 처리, 히스토리, 딥링크 및 safe area 정책은 연동 방식이 확정된 뒤 검증해야 합니다. 현재는 `viewport-fit=cover`만 준비했고 safe area 여백을 강제하지 않습니다.

## 브랜치와 PR 제안

`main`은 검증된 코드를 유지합니다. 초기 세팅은 `chore/project-setup`, 공통 UI는 `feat/common-ui`, 마이페이지는 `feat/mypage`, 옷장은 `feat/closet`을 제안합니다. 그 외 기능은 `feat/{기능명}`, 수정은 `fix/{오류명}`을 사용합니다. 각 담당자가 기능 브랜치에서 작업하고 타입 검사·린트·포맷·빌드 결과를 PR에 기록한 뒤 리뷰를 거쳐 `main`에 병합합니다. 푸시·병합은 담당자 확인 후 진행합니다.
