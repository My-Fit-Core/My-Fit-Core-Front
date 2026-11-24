# 구현 순서 및 GitHub Issue 초안

- 분석일: 2026-11-24
- 기준: [컴포넌트 인벤토리](03-component-inventory.md), [화면 명세](05-page-specifications.md), 사용자 확정 일정
- 아래는 Issue 초안이다. 실제 Issue는 만들지 않았으며 번호가 없으므로 브랜치명에는 실제 번호 자리표시자를 쓴다.

## 핵심 의존관계

| 선행                                                         | 후속                                    | 병렬 가능 작업                  |
| ------------------------------------------------------------ | --------------------------------------- | ------------------------------- |
| PR #2 Tailwind 병합 → 팀원 토큰 계약                         | 사용자 화면 스타일                      | Mock 모델·상태 전이·라우트 설계 |
| 팀원 Button·Icons·Navigation Bar 및 ClosetItemCard 담당 확정 | 옷장·마이페이지 완성                    | 스플래시 정적 UI, 데이터 설계   |
| 인증/온보딩 분기 계약                                        | 실제 로그인·초기 진입                   | 로그인 Mock UI                  |
| 백엔드 API/AI 명세                                           | 실제 Kakao 인증, 옷장·마이페이지 연동   | Mock 페이지                     |
| 패키징 결정                                                  | 카메라·시간 피커·OAuth 복귀 실기기 검증 | 브라우저 UI                     |

팀원에게 먼저 받을 것: 토큰 이름/폰트, Button과 Icons, Navigation Bar, Input·TypeBar·Option/Chip Props. ClosetItemCard·빈 상태는 원본 위치와 담당부터 확인한다. 사용자에게서 팀원에게 먼저 전달할 후보: Kakao 버튼, 알림 Toggle/TimeField와 Account Dialog, 옷장 ReviewCard·CategoryRow/Editor·PhotoModeTabs·저장 Dialog. 온보딩에서 실제 사용하는 사용자 소유 원본은 Instance 연결 확인 후 우선 전달한다.

## 11월 24일~12월 2일: UI·주요 인터랙션

| Issue 제목 / 유형·담당                          | 범위·Figma                                 | 선행·병렬                          | 우선순위·규모 | Acceptance Criteria                                      | 브랜치 제안                           |
| ----------------------------------------------- | ------------------------------------------ | ---------------------------------- | ------------- | -------------------------------------------------------- | ------------------------------------- |
| Tailwind v4·디자인 토큰 계약 / chore·팀원       | PR #2, DS 2:4                              | PR 리뷰; Mock 작업 병렬            | P0·M          | 병합 확인, 토큰·폰트 사용 계약 공유                      | chore/ISSUE_NUMBER-design-tokens      |
| 공통 Button·Icons·Navigation Bar / feat·팀원    | 329:1499, 334:23367, 317:1423              | 토큰; 사용자 로직 병렬             | P0·L          | 필수 Variant·Props·사용 예시 제공                        | feat/ISSUE_NUMBER-common-ui           |
| 스플래시·로그인 Mock UI/상태 / feat·사용자      | 400:10244, 400:10266, 403:10252            | 에셋/토큰; 옷장 Mock 병렬          | P0·M          | 기본·로딩·실패·취소, 중복 클릭 차단, Mock 표기           | feat/ISSUE_NUMBER-splash-login        |
| 인증 진입·온보딩 연결 / feat·협의               | /, /splash, /login, /onboarding            | 백엔드/온보딩 정책; 정적 UI 병렬   | P0·M          | 분기 규칙 확정, 루프·깜빡임 없는 Mock 검증               | feat/ISSUE_NUMBER-auth-routing        |
| 옷장 목록·필터·빈 상태·등록 진입 / feat·사용자  | 607:10857, 610:11136, 873:15206            | 공통 카드/네비; 사진 흐름 병렬     | P0·L          | 2열 스크롤, 필터·0건·등록 시트, 모바일 폭 확인           | feat/ISSUE_NUMBER-closet-main         |
| 사진 선택·AI Mock·검수·저장 / feat·사용자       | 727:3775~739:12658                         | Mock 모델, 카드/버튼; 메인 병렬    | P0·L          | 취소·파일 오류·0건·요청 실패·분류·저장 실패 복구         | feat/ISSUE_NUMBER-closet-registration |
| 옷장 상세·수정·삭제 Mock / feat·사용자          | 793:13332, 794:13358, 795:13409            | 목록 Mock·Button; 검수 병렬        | P1·M          | 상세·메모·카테고리·삭제 확인, 실패 시 유지               | feat/ISSUE_NUMBER-closet-detail       |
| 마이페이지 메인·프로필·추구미 / feat·사용자     | 418:10290, 443:10324, 445:10351, 459:10393 | 공통 UI; 옷장 병렬                 | P1·L          | Mock 프로필, 수정, 대표 1개·보조 최대 2개                | feat/ISSUE_NUMBER-mypage-profile      |
| 아카이브·알림·계정 Dialog / feat·사용자         | 482:10440, 484:10499, 873:14042, 535:10607 | Button·카드·인증 정책; 프로필 병렬 | P1·L          | 목록/Empty, ON/OFF·시간, 로그아웃/탈퇴 확인              | feat/ISSUE_NUMBER-mypage-settings     |
| UI·상태·모바일 브라우저 검증 / test·사용자·팀원 | 담당 화면 전체                             | UI 완료 후                         | P0·M          | typecheck/lint/format:check/build, 스크롤·터치·상태 검증 | test/ISSUE_NUMBER-ui-verification     |

P0는 12월 2일 목표를 차단하는 선행 작업과 옷장 핵심 흐름에 부여했다. 규모는 상대 복잡도이며 확정 일정이 아니다. 작은 원본마다 Issue를 만들지 않고 기능 단위로 묶었다.

## 12월 3일~12월 10일: 실제 API·AI 연동

| Issue 제목 / 유형·담당                                         | 범위·Figma                              | 선행·우선순위·규모       | Acceptance Criteria                           | 브랜치 제안                          |
| -------------------------------------------------------------- | --------------------------------------- | ------------------------ | --------------------------------------------- | ------------------------------------ |
| Kakao 인증·세션·로그아웃 / feat·사용자·백엔드 협의             | 400:10266, 535:10576                    | OAuth·보안 정책; P0·L    | 성공/취소/실패/재진입, 온보딩 분기 실검증     | feat/ISSUE_NUMBER-kakao-auth         |
| 옷장 CRUD·업로드·AI / feat·사용자·백엔드 협의                  | 607:10857, 727:3775~795:13553           | API/업로드/AI 계약; P0·L | 실제 목록·등록·분석·검수·수정·삭제, 실패 복구 | feat/ISSUE_NUMBER-closet-api         |
| 마이페이지 프로필·아카이브·알림·탈퇴 / feat·사용자·백엔드 협의 | 443:10324~873:14042                     | API·계정 정책; P1·L      | 조회·수정·Empty·설정 저장·탈퇴 결과 확인      | feat/ISSUE_NUMBER-mypage-api         |
| 모바일 패키징·실기기 통합 검증 / test·협의                     | splash, OAuth, 카메라/갤러리, 시간 피커 | 기술 확정; P1·L          | 실기기에서 복귀·권한·safe area·키보드 검증    | test/ISSUE_NUMBER-mobile-integration |

실제 API 명세가 없으므로 엔드포인트/응답 형식과 토큰 위치를 확정하지 않았다. 네이티브 기술 확정 전 SDK 설치도 계획에 넣지 않았다.
