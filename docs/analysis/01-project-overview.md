# 프로젝트 및 코드베이스 현황

- 최초 분석일은 2026-11-24이며, 코드 현황은 2026-11-27 Issue #16 브랜치를 기준으로 갱신했다.
- 출처는 `AGENTS.md`, `package.json`, 라우팅·스타일·컴포넌트 코드와 `develop` 병합 이력이다.

## 확인된 사실

| 항목      | 현재 코드                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 기술      | React 19.3.1, React Router DOM 7.18.6, Vite 8.3.8, TypeScript 5.9.3 strict, Tailwind CSS v4, npm                             |
| 스타일    | `global.css`에서 Tailwind를 불러오며 `tokens.css`와 `fonts.css`로 공통 토큰과 폰트를 관리한다.                               |
| 경로      | `/`가 `/home`으로 이동한다. 기존 서비스 경로는 화면 골격이며 `/dev/closet-components`는 개발 전용이다.                       |
| 공통 UI   | `src/components/common/`에 `Button`, `Icon`, `StyleTag`, `WeatherChip` 구현이 있다.                                          |
| 옷장      | Issue #16에서 공통 타입, 8개 대분류·36개 소분류와 재사용 컴포넌트 5개를 제공한다. 실제 페이지와 API·AI 연동은 후속 작업이다. |
| 경로 별칭 | `vite.config.ts`와 `tsconfig.app.json`에서 `@/`를 `src/`로 매핑한다.                                                         |

Tailwind 설정, 협업 규칙과 초기 분석 문서는 `develop`에 병합됐다. [PR #2](https://github.com/My-Fit-Core/My-Fit-Core-Front/pull/2) · [PR #3](https://github.com/My-Fit-Core/My-Fit-Core-Front/pull/3) · [PR #5](https://github.com/My-Fit-Core/My-Fit-Core-Front/pull/5)

## 담당 경계

| 대상                                                                                         | 담당                                   |
| -------------------------------------------------------------------------------------------- | -------------------------------------- |
| 디자인 시스템 `2:4` 원본/토큰/공통 UI, 온보딩 페이지                                         | 다른 프론트엔드 팀원                   |
| 최종 디자인 `2:6` 원본 32개 단위 후보, 스플래시·로그인·디지털 옷장·마이페이지 화면·상태 44개 | 사용자                                 |
| STC-001 착용 선택 페이지 5개                                                                 | 다른 팀원 담당안, 최종 합의 전         |
| STC-005 코디 보관함·폴더 5개                                                                 | 다른 팀원 담당, 구형 화면 채택 확인 전 |
| 홈·캘린더·피드 페이지                                                                        | 현재 Issue/팀 합의 확인 필요           |

원본 컴포넌트의 위치와 화면 담당은 독립적으로 판별한다. 전체 목록은 [인벤토리](03-component-inventory.md)를 참조한다.

## 재사용과 착수 조건

옷장 메인·검수·정보 수정과 착용 아이템 선택 화면은 필요한 Issue #16 컴포넌트와 타입을 재사용한다. 미구현 화면의 라우트와 상태는 페이지 명세를 참고한다. [옷장 컴포넌트 사용법](08-closet-components.md) · [화면 명세](05-page-specifications.md)

**구현 제안:** `src/pages/{splash,login,closet,mypage}`, `src/components/{splash,login,closet,mypage}`, `src/mocks`, `src/types`를 필요한 시점에만 사용한다. `src/routes/AppRoutes.tsx`의 기존 타인 경로를 유지하며 인증 진입 정책 확정 후 `/`와 `/splash`를 조정한다.

**미확정:** 인증/온보딩 완료 판별, Kakao OAuth 계약, API 스키마, 모바일 패키징, 후속 Issue 범위. [미확정 사항](07-open-questions.md) 참조.

## 2026-11-24 개발 착수 기준 기록

- 2:4 원본·공통 UI·디자인 토큰·전역 폰트는 다른 팀원, 2:6 원본 39개(독립 구현 단위 후보 32개)는 사용자 소유다. 원본 소유와 사용 페이지 소유는 다를 수 있다.
- 사용자 페이지는 스플래시·로그인 2개, 옷장 28개, 마이페이지 14개 화면·상태 Frame이다. 착용 선택 5개는 STC-001 팀원 담당안(최종 합의 전), 보관함·폴더 5개는 STC-005 팀원 담당으로 분리한다.
