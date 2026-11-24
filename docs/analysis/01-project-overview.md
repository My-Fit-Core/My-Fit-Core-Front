# 프로젝트 및 코드베이스 현황

- 분석일: 2026-11-24
- 로컬 브랜치: `docs/figma-analysis`, 기준 SHA: `2db91badb9f9398cfe127f3d66934b7cf031a76f`
- 출처: 로컬 `AGENTS.md`, `README.md`, `package.json`, 라우팅/스타일 파일, `origin/chore/git-workflow`의 문서, GitHub PR #2·#3 조회

## 확인된 사실

| 항목      | 현재 분석 브랜치                                                                                          | 병합 대기 / 확정 규칙                                                        |
| --------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 기술      | React 19.3.1, React Router DOM 7.18.6, Vite 8.3.8, TypeScript 5.9.3 strict, npm                           | Tailwind CSS v4는 PR #2에서 준비 중                                          |
| 스타일    | `src/styles/global.css`에 기본 리셋, `tokens.css`는 주석만 존재                                           | PR #2는 `@import 'tailwindcss'`, `tailwindcss`·`@tailwindcss/vite` 추가      |
| 경로      | `/`가 `/home`으로 이동; `/login`, `/onboarding`, `/home`, `/closet`, `/calendar`, `/feed`, `/mypage` 존재 | `/splash`와 인증 기반 진입은 미구현                                          |
| 페이지    | 각 페이지는 Placeholder. 실제 UI, API, 인증, Mock 로직 없음                                               | 12월 2일까지 페이지/주요 인터랙션, 12월 10일까지 API·AI 연동 계획            |
| 공통 UI   | `src/components/common`에 구현 없음                                                                       | 다른 팀원 담당. 토큰/Props 미확정                                            |
| 경로 별칭 | `vite.config.ts`, `tsconfig.app.json`에 `@/` 매핑 확인                                                    | PR #3에서도 관련 설정·문서 정리                                              |
| 문서      | 현재 루트 문서는 이전 CSS Modules·Flutter WebView 전제를 포함                                             | 사용자 확정 규칙과 PR #3의 Tailwind/Capacitor·담당 경계를 분석 기준으로 사용 |

GitHub 연결 도구 조회 기준 PR [#2](https://github.com/My-Fit-Core/My-Fit-Core-Front/pull/2)와 [#3](https://github.com/My-Fit-Core/My-Fit-Core-Front/pull/3)은 모두 `develop` 대상 **open, 미병합**이다. GitHub CLI `gh pr list`는 네트워크 연결 오류가 발생했으며 연결된 GitHub 도구로 상태를 확인했다. 로컬 원격 추적 브랜치와 실제 GitHub 상태를 혼동하지 않는다.

## 담당 경계

| 대상                                                                | 담당                         |
| ------------------------------------------------------------------- | ---------------------------- |
| 디자인 시스템 `2:4` 원본/토큰/공통 UI, 온보딩 페이지                | 다른 프론트엔드 팀원         |
| 최종 디자인 `2:6` 원본, 스플래시·로그인·디지털 옷장·마이페이지 화면 | 사용자                       |
| 홈·캘린더·피드 페이지                                               | 현재 Issue/팀 합의 확인 필요 |

원본 컴포넌트의 위치와 화면 담당은 독립적으로 판별한다. 전체 목록은 [인벤토리](03-component-inventory.md)를 참조한다.

## 재사용과 착수 조건

현재 코드에서 직접 재사용 가능한 것은 React Router 골격, 별칭 설정, 전역 리셋, 디렉터리 구조다. UI 컴포넌트와 데이터 모델은 없다. 구현 전에 PR #2의 병합 여부와 공통 컴포넌트의 실제 API를 재확인해야 한다. 해당 작업 대기 중에도 라우트 설계안, 타입/Mock 데이터, 화면 상태 전이, 최종 디자인의 에셋 목록 정리는 병렬 진행 가능하다. 아직 병합되지 않은 코드가 현재 브랜치에 있다고 가정하지 않는다.

**구현 제안:** `src/pages/{splash,login,closet,mypage}`, `src/components/{splash,login,closet,mypage}`, `src/mocks`, `src/types`를 필요한 시점에만 사용한다. `src/routes/AppRoutes.tsx`의 기존 타인 경로를 유지하며 인증 진입 정책 확정 후 `/`와 `/splash`를 조정한다.

**미확정:** 인증/온보딩 완료 판별, Kakao OAuth 계약, API 스키마, 모바일 패키징, 실제 Issue 번호. [미확정 사항](07-open-questions.md) 참조.
