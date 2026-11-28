# 구현 순서 및 GitHub Issue 초안

- 분석일: 2026-11-24
- 기준: [컴포넌트 인벤토리](03-component-inventory.md), [화면 명세](05-page-specifications.md), 사용자 확정 일정
- 아래는 Issue 초안이다. 실제 Issue는 만들지 않았으며 번호가 없으므로 브랜치명에는 실제 번호 자리표시자를 쓴다.

## 핵심 의존관계

| 선행                                                              | 후속                                    | 병렬 가능 작업                  |
| ----------------------------------------------------------------- | --------------------------------------- | ------------------------------- |
| PR #2 Tailwind 병합 → 팀원 토큰 계약                              | 사용자 화면 스타일                      | Mock 모델·상태 전이·라우트 설계 |
| 팀원 Button·Icons·Navigation Bar 계약; 사용자 ClosetItemCard 구현 | 옷장·마이페이지 완성                    | 스플래시 정적 UI, 데이터 설계   |
| 인증/온보딩 분기 계약                                             | 실제 로그인·초기 진입                   | 로그인 Mock UI                  |
| 백엔드 API/AI 명세                                                | 실제 Kakao 인증, 옷장·마이페이지 연동   | Mock 페이지                     |
| 패키징 방식 초기 비교                                             | 카메라·시간 피커·OAuth 복귀 실기기 검증 | 브라우저 UI                     |

팀원에게 먼저 받을 것: 토큰 이름/폰트, Button과 Icons, Navigation Bar, Input·TypeBar·Option/Chip Props, 공통 레이아웃·Safe Area 사용 방식. ClosetItemCard·빈 상태는 사용자 소유 원본으로 확인됐다. 사용자에게서 팀원에게 먼저 전달할 후보: Kakao 버튼, 알림 Toggle/TimeField와 Account Dialog, 옷장 ReviewCard·CategoryRow·CategoryBottomSheet·PhotoModeTabs·저장 Dialog. 온보딩에서 실제 사용하는 사용자 소유 원본은 Instance 연결 확인 후 우선 전달한다.

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

## 2026-11-24 Issue 초안 보정

위 최초 Issue 표는 분석 이력이다. 아래 표에는 담당 범위와 우선순위, 생성된 Issue #16을 반영했다. 브랜치명 `ISSUE_NUMBER`는 실제 번호 확보 후 교체한다. P0/P1 및 S/M/L은 상대적 우선순위·규모 제안이다.

| Issue 코드·초안 / 담당                         | 우선·규모 | 선행·병렬 작업                              | 완료 조건                                                                                                   | 브랜치 제안                                      |
| ---------------------------------------------- | --------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| I-01 토큰·공통 폰트·공통 UI 계약 / 팀원        | P0·M      | PR #2/#3 상태 확인; Mock 데이터 병렬        | Button·Icons·Navigation Bar·Option/Chip·입력·레이아웃·Safe Area의 Props·경로·사용 예시 공유                 | `chore/ISSUE_NUMBER-ui-contract`                 |
| I-02 스플래시·로그인 UI / 사용자               | P0·M      | I-01, 확정 로고 SVG 전달; 인증 Mock 병렬    | 로고 에셋 적용, 기본·진행·실패 인라인 문구·취소, 중복 클릭 방지, 홈/온보딩 분기 Mock                        | `feat/ISSUE_NUMBER-splash-login`                 |
| I-03 옷장 재사용 카드·카테고리 / 사용자        | P0·M      | I-01 Icons/Button; 카테고리 정의 독립       | ClosetItemCard·CategoryFilterTrigger·CategoryRow·CategoryBottomSheet·ClosetEmptyState와 8/36 공통 분류 구현 | `feat/#16-closet-components`                     |
| I-04 옷장 메인·필터 / 사용자                   | P0·L      | I-03, Navigation Bar; 등록 Mock 병렬        | 목록·전체 빈 상태·필터 0건·등록 진입, 최신 카테고리 표시                                                    | `feat/ISSUE_NUMBER-closet-main`                  |
| I-05 사진 선택·AI Mock / 사용자                | P0·L      | I-01, 이미지 접근 초기 검증; 검수 Mock 병렬 | 촬영·갤러리·선택 취소·다중 의류 사진·분석 중·0건·실패, 가이드 오버레이 제외                                 | `feat/ISSUE_NUMBER-closet-photo-ai`              |
| I-06 결과 검수·저장 / 사용자                   | P0·L      | I-03/I-05; 상세 Mock 병렬                   | 제외·카테고리 수정·0/1/다수·저장 중·실패 복구, 8/36 분류                                                    | `feat/ISSUE_NUMBER-closet-review`                |
| I-07 의류 상세·수정·삭제 / 사용자              | P1·M      | I-03/I-04, 공통 입력                        | 원본/누끼·분류·메모·삭제 확인과 오류 복구                                                                   | `feat/ISSUE_NUMBER-closet-detail`                |
| I-08 마이페이지·프로필 / 사용자                | P1·L      | I-01; 아카이브 병렬                         | 메인·기본 아바타·프로필·SNS 링크·하위 페이지 Navigation Bar 숨김                                            | `feat/ISSUE_NUMBER-mypage-profile`               |
| I-09 추구미 관리 / 사용자                      | P1·M      | I-01 Option/Chip; 프로필 병렬               | 5개 추구미, 대표 1개·보조 최대 2개, 이름 일관성                                                             | `feat/ISSUE_NUMBER-mypage-styles`                |
| I-10 아카이브·알림 / 사용자                    | P1·L      | I-01, I-08; 계정 Dialog 병렬                | ArchiveCard 목록/Empty, 알림 ON/OFF·시간 UI, 메인만 Navigation Bar                                          | `feat/ISSUE_NUMBER-mypage-archive-notifications` |
| I-11 계정 Dialog / 사용자                      | P1·M      | I-01, 인증·탈퇴 정책; I-08 병렬             | 로그아웃·탈퇴 확인/취소·제출 중, 탈퇴 정책 미확정 표기                                                      | `feat/ISSUE_NUMBER-account-dialogs`              |
| I-12 UI·통합 검증 / 사용자·팀원                | P0·M      | I-02~I-11 UI 완료                           | typecheck/lint/format/build, 화면 상태·접근성·실기기 viewport 확인                                          | `test/ISSUE_NUMBER-ui-integration`               |
| I-13 실제 API·AI·OAuth 연동 / 사용자·백엔드·AI | P0·L      | API·AI·OAuth 계약 확정; UI Mock 병렬        | 로그인/가입 분기·옷장 CRUD·AI·마이페이지 저장의 실제 응답·오류 처리                                         | `feat/ISSUE_NUMBER-api-ai-integration`           |

I-02~I-12의 UI 일정은 11월 24일~12월 2일, I-13의 실제 연동은 12월 3일~10일, 발표 전 통합·실기기 검증이다. STC-001 착용 선택과 STC-005 보관함 페이지는 사용자 Issue에서 제외한다. I-03의 카드·카테고리 계약은 [Issue #16 사용법](08-closet-components.md)에 정리했다. I-04·I-06·I-07은 페이지에서 해당 컴포넌트를 연결하는 후속 작업이다.

## 모바일 기술 초기 검증

패키징은 미확정이며 Capacitor 우선 검토와 Flutter WebView 비교가 필요하다. UI 개발과 병행해 카메라·갤러리 접근/취소, 이미지 업로드, 앱 권한, Kakao OAuth 복귀, Safe Area, OS 상태바·홈 인디케이터, 네이티브 Splash와 React Splash의 관계를 확인한다. 실제 앱 패키징 SDK 설치나 API 계약 확정은 이 문서 작업의 범위가 아니다.

## 사용자 담당 32개 구현 단위 후보 → Issue 추적

I-03 시트 원본은 `CategoryBottomSheet` 편집 모드에 통합했다. 후속 작업의 구현 방식은 제안이다. Variant는 Set 단위로 묶고 일부 원본은 정적 에셋·OS UI·공통 컴포넌트 조합으로 처리한다. 원본의 페이지 배치와 화면 담당은 별개다. 아래 각 행은 [인벤토리](03-component-inventory.md)의 2:6 원본/Set 후보 한 단위다.

| Figma 원본                                                | Node ID      | 방식                   | 관련 페이지    | 요구사항        | Issue     | 팀원 의존       | 우선 | 미확정             |
| --------------------------------------------------------- | ------------ | ---------------------- | -------------- | --------------- | --------- | --------------- | ---- | ------------------ |
| MAPIKO / NotificationToggle                               | `535:10573`  | Variant 통합           | 알림           | 추가 요구사항   | I-10      | 토큰            | P1   | 저장 정책          |
| MAPIKO / ConfirmationDialog                               | `535:10607`  | Variant 통합           | 계정 Dialog    | MYP-004         | I-11      | Button          | P1   | 탈퇴 정책          |
| MAPIKO / NotificationTimeField                            | `537:10585`  | Variant 통합           | 알림           | 추가 요구사항   | I-10      | Input·토큰      | P1   | Availability3 의미 |
| DigitalCloset / PhotoModeTabs                             | `792:13338`  | Variant 통합           | 의류 상세      | CLO-005         | I-07      | Icons           | P1   | 실제 이미지        |
| DigitalCloset / 4-1 Local CTA / DS-background composition | `677:12810`  | 공통 Button 조합       | 옷장 메인·검수 | CLO-001/004     | I-04/I-06 | Button          | P0   | Props 계약         |
| Kakao Login Button / proposal (Official symbol pending)   | `403:10252`  | Variant 통합           | 로그인         | Login-001       | I-02      | 공식 Kakao 심볼 | P0   | OAuth              |
| MFC                                                       | `946:3810`   | 협의 필요              | 캘린더 등      | —               | 연계·팀원 | Icons           | P1   | 실제 사용/형태     |
| bottom navigation/nav bar                                 | `433:1638`   | OS/네이티브 UI         | 메인·로그인    | SYS-001         | I-12      | Safe Area       | P1   | 패키징             |
| MAPIKO / ConfirmationDialog/Intent3                       | `930:3877`   | 기존 Dialog 조합       | 계정 Dialog    | MYP-004         | I-11      | Button          | P1   | 중복/차이          |
| MAPIKO / Button / Destructive Abled                       | `535:10574`  | 공통 Button 조합       | 탈퇴           | MYP-004         | I-11      | Button          | P1   | 위험 Variant       |
| MAPIKO / NotificationTimeField/Disabled                   | `537:10583`  | 기존 TimeField Variant | 알림           | 추가 요구사항   | I-10      | Input           | P1   | 중복/차이          |
| Time Picker Dialog / native UI                            | `873:13762`  | OS/네이티브 UI         | 알림           | 추가 요구사항   | I-10      | Safe Area       | P1   | 피커 방식          |
| Group 36                                                  | `873:15397`  | 협의 필요              | 옷장           | CLO-001         | I-04      | Icons           | P1   | 원본 역할          |
| image 6                                                   | `918:3775`   | 정적 에셋              | 사진 확인      | CLO-002         | I-05      | 에셋            | P0   | 사용권             |
| DigitalCloset / 4-3 ClothingReviewCard / Detected         | `739:12677`  | 독립 React 컴포넌트    | 검수           | CLO-004         | I-06      | Icons·Button    | P0   | AI 데이터          |
| DigitalCloset / ClothingCategoryEditor / Shared Sheet     | `787:12842`  | 편집 모드로 통합       | 검수·수정      | CLO-004/005     | I-03      | Button          | P0   | API 매핑           |
| DigitalCloset / AccessoryCategoryEditor / Shared Sheet    | `796:13622`  | 액세서리 분류로 통합   | 검수·수정      | CLO-004/005     | I-03      | Button          | P0   | API 매핑           |
| DigitalCloset / ClothingDetailInfoRow                     | `792:13327`  | 독립 React 컴포넌트    | 의류 상세      | CLO-005         | I-07      | Typography      | P1   | 없음               |
| DigitalCloset / DangerButton                              | `792:13339`  | 공통 Button 조합       | 의류 상세      | CLO-005         | I-07      | Button          | P1   | 위험 Variant       |
| DigitalCloset / ConfirmationDialog                        | `792:13341`  | 독립 React 컴포넌트    | 의류 삭제      | CLO-005         | I-07      | Button          | P1   | Dialog 공통화      |
| DigitalCloset / SaveFailureDialog                         | `850:13434`  | 독립 React 컴포넌트    | 검수 저장      | CLO-004         | I-06      | Button          | P0   | 실패 코드          |
| Group 28                                                  | `872:6054`   | 협의 필요              | 옷장           | CLO-001         | I-04      | Icons           | P1   | 원본 역할          |
| DigitalCloset / CategoryRow/Default                       | `587:10687`  | Variant 통합           | 카테고리 시트  | CLO-001/004     | I-03      | Icons           | P0   | 선택 UX            |
| DigitalCloset / CategoryRow/Selected                      | `587:10689`  | Variant 통합           | 카테고리 시트  | CLO-001/004     | I-03      | Icons           | P0   | 선택 UX            |
| DigitalCloset / CategoryRow/Drilldown                     | `587:10694`  | Variant 통합           | 카테고리 시트  | CLO-001/004     | I-03      | Icons           | P0   | 선택 UX            |
| Component 1                                               | `930:4146`   | 협의 필요              | 옷장           | CLO-001         | I-04      | Icons           | P1   | 원본 역할          |
| image 2                                                   | `440:1689`   | 정적 에셋              | 스플래시       | Login-001       | I-02      | 로고 에셋       | P0   | 파일 전달          |
| image 3                                                   | `397:1583`   | 정적 에셋              | 로그인         | Login-001       | I-02      | 에셋            | P0   | 사용권             |
| ArchiveCard / liked / sample 1                            | `1039:19984` | 독립 React 컴포넌트    | 아카이브       | MYP-003/005     | I-10      | Icons           | P1   | Own 상세           |
| REFERENCE INSTANCE / P0 / CategoryFilterTrigger           | `1039:19985` | 독립 React 컴포넌트    | 옷장 필터      | CLO-001         | I-03      | Icons·토큰      | P0   | Instance 연결      |
| REFERENCE INSTANCE / P0 / ClosetEmptyState                | `1039:19986` | 독립 React 컴포넌트    | 옷장 빈 상태   | CLO-001         | I-03      | Button          | P0   | Instance 연결      |
| REFERENCE INSTANCE / P0 / ClosetItemCard / Default        | `1039:19987` | 독립 React 컴포넌트    | 옷장·STC-001   | CLO-001/STC-001 | I-03      | Icons·토큰      | P0   | 선택 상태/연결     |

`—`는 확인된 요구사항 ID가 없음을 뜻한다. “없음”은 이 표에서 추가 미확정이 없다는 뜻이며 API·디자인 공통 계약까지 완료됐다는 의미는 아니다.
