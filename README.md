# My-Fit-Core-Front

MAPIKO(마피코)는 AI 기반 패션 스타일링 및 디지털 옷장 서비스입니다. 이 저장소는 모바일 우선 React 웹 앱의 개발 기반입니다. 모바일 앱 패키징 방식은 팀 결정에 따르며 Capacitor를 우선 검토합니다. 현재는 공통 컴포넌트와 실제 서비스 화면을 구현하지 않은 초기 세팅입니다. 페이지와 주요 인터랙션 개발 목표일은 2026년 12월 2일입니다. API 및 AI 기능 연동은 12월 3일부터 10일까지 진행할 예정이며, 그 전에는 Mock 데이터 사용 여부를 명확히 표시합니다.

- 저장소: https://github.com/My-Fit-Core/My-Fit-Core-Front.git
- Figma 최종 디자인: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-6 (File Key `XhhPLJSwkdCMAJgzqFLELf`, 페이지 Node ID `2:6`)
- Figma 디자인 시스템: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-4 (페이지 Node ID `2:4`)
- Figma 초기 와이어프레임: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-5 (페이지 Node ID `2:5`, 구조와 흐름 참고용)

## 실행 환경과 기술 스택

Node.js 22.12 이상, npm 10 이상을 사용합니다. 초기 세팅 검증 환경은 Node.js 22.19.0, npm 10.9.3입니다. React, TypeScript strict mode, Vite, React Router, ESLint flat config, Prettier, npm을 사용합니다. 스타일링 기준은 Tailwind CSS v4이며 설정은 별도 PR #2에서 진행 중입니다. 현재 브랜치에는 아직 반영되지 않았습니다. 정확한 설치 버전은 `package.json`과 `package-lock.json`을 기준으로 합니다.

```bash
npm ci
npm run dev
```

개발 서버가 출력한 로컬 주소로 접속합니다. 배포 빌드는 `npm run build`, 결과 확인은 `npm run preview`를 사용합니다.

## 폴더 역할

- `src/pages/`: 경로별 페이지. 현재 파일은 경로 확인용 최소 표시만 포함합니다.
- `src/components/common/`: 공통 컴포넌트 담당자 소유 영역. 디자인 시스템과 공통 Props가 확정되면 구현합니다.
- `src/components/{splash,login,closet,mypage}/`: 사용자 담당 페이지의 도메인별 컴포넌트 영역. 필요한 시점에 생성합니다.
- `src/components/layout/`의 공통 레이아웃과 디자인 시스템 원본 컴포넌트는 다른 프론트엔드 팀원 담당입니다.
- `src/routes/`: 라우트 정의. `src/App.tsx`에서 연결합니다.
- `src/styles/global.css`: 전역 스타일과 PR #2 병합 후 Tailwind CSS 진입점. `src/styles/tokens.css`: 다른 팀원이 담당하는 디자인 토큰의 향후 위치. 페이지 스타일은 Tailwind 유틸리티 클래스를 우선 사용합니다.
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

실제 UI는 Figma 최종 디자인 페이지(`2:6`)를 기준으로 구현합니다. 디자인 시스템(`2:4`)은 공통 컴포넌트와 토큰 기준이며, 초기 와이어프레임(`2:5`)은 화면 구조와 사용자 흐름 참고용입니다. 페이지 개발 전에 해당 화면의 정확한 Frame/Node ID를 확인하고, 접근 가능한 경우 Figma MCP로 레이아웃·컴포넌트·토큰·타이포그래피·에셋을 분석합니다. 디자인을 임의로 재해석하지 않습니다. 접근이 불가능하거나 정보가 불명확하면 추측해 구현하지 않고 필요한 정보를 확인합니다. 이번 초기 세팅에서는 Figma 화면을 구현하지 않았습니다.

사용자 담당 페이지는 스플래시, 로그인, 디지털 옷장, 마이페이지입니다. 온보딩 페이지와 디자인 시스템(`2:4`)의 공통 컴포넌트·토큰은 다른 프론트엔드 팀원이 담당합니다. 최종 디자인(`2:6`)에서 생성된 원본 페이지별 컴포넌트는 사용자가 담당하지만, 온보딩 페이지 자체는 구현하지 않습니다. 나머지 페이지 담당은 작업 Issue와 팀 합의를 확인합니다.

`BrowserRouter`를 사용하므로 배포 서버는 새로고침과 직접 URL 접속 시 `index.html`로 돌아오는 SPA fallback이 필요합니다. 모바일 패키징 기술이 확정되면 URL 처리, 히스토리, 딥링크 및 safe area 정책을 검증해야 합니다. 현재는 `viewport-fit=cover`만 준비했고 safe area 여백을 강제하지 않습니다.

## 브랜치 전략

GitHub 기본 브랜치는 `develop`입니다. `main`은 통합 검증을 통과한 발표·시연용 안정 버전이며, `develop`은 프론트엔드 개발과 통합 테스트의 기준입니다. 두 브랜치에서 직접 개발하거나 Push하지 않습니다. 작업 브랜치는 최신 `develop`에서 만들고 PR로 `develop`에 병합합니다. 통합 테스트를 통과한 `develop`만 별도 PR로 `main`에 병합합니다. 현재는 별도 release·hotfix 브랜치를 사용하지 않습니다.

작업 브랜치 형식은 `타입/이슈번호-작업명`이며 이슈 번호에는 실제 GitHub Issue 번호를 사용합니다. 기존 브랜치는 임의로 삭제하거나 이름을 바꾸지 않습니다.

| 타입       | 용도                    |
| ---------- | ----------------------- |
| `feat`     | 신규 기능               |
| `fix`      | 오류 수정               |
| `ui`       | UI 및 디자인 수정       |
| `chore`    | 환경설정 및 의존성 관리 |
| `refactor` | 코드 구조 개선          |
| `docs`     | 문서 수정               |
| `test`     | 테스트 추가 및 수정     |

예: `feat/12-common-button`, `feat/13-mypage`, `feat/14-closet`, `fix/15-image-upload`, `chore/16-tailwind-setup`

## Git 작업 순서

1. GitHub Issue를 만들고 작업 범위를 정합니다.
2. 최신 `develop`을 가져옵니다.
3. Issue 번호로 작업 브랜치를 만듭니다.
4. 담당 기능을 개발합니다.
5. 타입 검사, ESLint, Prettier, 빌드와 필요한 테스트를 실행합니다.
6. 변경사항을 Commit하고 작업 브랜치를 Push합니다.
7. `develop`을 대상으로 Pull Request를 만듭니다.
8. 상대 프론트엔드 팀원의 코드 리뷰와 승인을 받습니다.
9. 필수 수정사항을 해결한 뒤 `develop`에 Merge합니다.
10. 통합 검증을 마친 `develop`을 별도 PR로 `main`에 Merge합니다.

새 작업을 시작할 때 아래 명령을 실행합니다. 마지막 브랜치명은 실제 Issue 번호와 작업명으로 바꿉니다. 브랜치를 전환하기 전에 `git status`로 미저장 변경사항을 확인합니다.

```bash
git status
git switch develop
git pull --ff-only origin develop
git switch -c feat/<실제이슈번호>-<작업명>
```

개발 중 상대 팀원의 최신 코드를 가져올 때는 변경사항을 Commit 또는 Stash로 안전하게 저장한 다음 본인의 작업 브랜치에서 실행합니다.

```bash
git fetch origin
git merge origin/develop
```

Commit 메시지는 `type: 작업 내용` 형식을 사용합니다. 예: `feat: 공통 버튼 컴포넌트 구현`, `fix: 이미지 등록 오류 수정`, `ui: 옷장 카드 여백 수정`, `chore: Tailwind CSS 설정 추가`, `docs: 협업 규칙 수정`.

일반 개발 PR은 Base `develop`, Compare 작업 브랜치로 만듭니다. 안정 버전 반영 PR은 Base `main`, Compare `develop`으로 만듭니다. PR 제목은 `[타입] #이슈번호 작업 내용` 형식을 사용하고, 본문에는 작업 내용·스크린샷 또는 시연 화면·검증 결과·관련 Issue·미완료 항목 및 의존성·리뷰 요청 사항을 기록합니다. Issue 전체를 완료하면 `Closes #이슈번호`, 일부만 완료하면 `Refs #이슈번호`를 사용합니다. Issue가 없는 예외 작업은 번호를 만들어 적지 않습니다. 공통 협업 규칙은 [Notion 문서](https://app.notion.com/p/422ff3436dff801d899bf4dabdff399a)를 참고합니다.

상대 프론트엔드 팀원 1명의 승인을 기본으로 하고 필수 수정사항을 해결한 뒤 Merge합니다. 작업 브랜치 → `develop`은 Squash and merge를 권장합니다. `develop` → `main`은 Create a merge commit으로 브랜치 간 이력을 유지합니다. `main`과 `develop`에 직접 Push하지 않으며, 사용자 승인 없이 Merge, Force Push 또는 기존 브랜치 삭제를 하지 않습니다.

## 브랜치 운영 일정

| 기간            | 작업                                                          |
| --------------- | ------------------------------------------------------------- |
| 2026/11/24~12/2 | 공통 컴포넌트, 페이지 및 주요 인터랙션 개발 후 `develop` 병합 |
| 2026/12/3~12/10 | API 및 AI 기능 연동 작업 후 `develop` 병합                    |
| 최종 발표 전    | 통합 테스트 및 모바일 실기기 검증 후 `develop` → `main`       |

12월 2일 페이지 구현 완료 시 Mock 데이터 사용 여부와 실제 API 연동 상태를 구분하여 기록합니다. 검증을 통과하지 못한 코드는 `main`에 병합하지 않습니다.
