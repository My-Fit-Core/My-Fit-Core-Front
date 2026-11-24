# MAPIKO 에이전트 개발 규칙

## 프로젝트와 범위

이 저장소는 모바일 우선 React 웹 앱이며 Vite, TypeScript strict, React Router, npm, ESLint Flat Config, Prettier, CSS Modules와 전역 CSS를 사용한다. 기존 디렉터리 구조와 `package-lock.json`을 유지한다. 현재 Placeholder는 경로 확인용이며 실제 서비스 화면이나 인증, API 로직이 아니다.

## 디자인과 담당 영역

Figma 기준 파일은 https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-5 이다. File Key는 `XhhPLJSwkdCMAJgzqFLELf`, 참조 Node ID는 `2:5`이다. 페이지 구현 전 해당 페이지의 정확한 Frame/Node ID를 확인한다. 접근 가능하면 Figma MCP로 레이아웃, 토큰, 컴포넌트, 타이포그래피, 에셋을 확인한다. 접근하지 못했다면 분석했다고 주장하지 말고 디자인을 추측하지 않는다. 확정된 디자인을 기준으로 구현한다.

`src/components/common/`의 디자인 시스템과 공통 컴포넌트는 별도 담당자 소유다. 페이지 작업 시 기존 공통 컴포넌트와 Props, 토큰을 먼저 확인하고 재사용한다. Button, Input, Modal, Chip, AppBar, BottomNavigation, Typography 등을 중복 구현하지 않는다. 담당자와 합의 없이 공통 Props, 토큰, 다른 팀원의 영역을 변경하지 않는다. 공통 UI가 아직 없으면 의존성을 명시하고 독립적으로 가능한 작업을 진행한다.

## 코드와 보안

불필요한 의존성이나 과도한 추상화를 추가하지 않는다. API 명세와 인증 흐름을 임의로 만들지 않는다. 비밀정보를 소스나 `VITE_` 환경변수에 넣지 않는다. `.env.local` 등 실제 환경 파일은 Git에 포함하지 않는다. TypeScript strict를 유지하고 ESLint와 Prettier 규칙을 따른다. 완료 후 `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`를 실행한다.

사용자 승인 없이 Git commit, push, merge, force push를 하지 않는다. 기존 작업과 이력을 보존하고 담당 브랜치에서 작업한다.
