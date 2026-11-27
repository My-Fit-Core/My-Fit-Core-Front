# Error Report: Figma 원본 에셋 다운로드 403

## 1. Basic Information

- Date and time: 2026-11-28 (Asia/Seoul)
- Task: Issue #23 마이페이지 잔여 기능
- Branch: Cloud 내부 `work` (기준: `feat/23-mypage-styles`의 `24d8de5`)
- Related files: `src/mocks/archive.ts`, `src/components/mypage/ArchiveEmptyState.tsx`, `src/components/mypage/NotificationToggle.tsx`, `src/pages/mypage/MyPage.tsx`, `src/components/mypage/AccountConfirmationDialog.tsx`
- Occurrence count: 5회 이상 동일한 HTTP 403
- Status: Blocked (원본 파일 접근)

## 2. Error Details

- Error message: `curl: (22) The requested URL returned error: 403`
- Location: Figma MCP가 반환한 `https://www.figma.com/api/mcp/asset/...` 임시 URL의 로컬 다운로드
- Reproduction conditions: Figma `get_design_context` 및 `download_assets`로 받은 URL을 Cloud 작업 공간의 `curl -fL`로 요청
- Expected behavior: PNG/SVG 원본 파일 다운로드
- Actual behavior: HTTP 403, 로컬 원본 파일 없음

## 3. Previous Resolution Attempts

| Attempt | Action                                           | Result | Reason for failure         |
| ------- | ------------------------------------------------ | ------ | -------------------------- |
| 1       | NotificationToggle SVG 두 상태 URL 다운로드      | 403    | URL 접근 거부; 원인 미확정 |
| 2       | `download_assets`에서 새로 받은 SVG URL 다운로드 | 403    | URL 접근 거부; 원인 미확정 |
| 3       | 두 Archive Empty State PNG URL 다운로드          | 403    | URL 접근 거부; 원인 미확정 |

## 4. Root Cause Analysis

- Verified facts: Figma 디자인 컨텍스트와 스크린샷 조회는 성공했다. Cloud 셸의 임시 에셋 URL 다운로드는 반복해서 403을 반환했다.
- Root cause: 이 실행 환경에서 Figma 임시 에셋 URL에 접근할 수 없음. 서버가 거부한 세부 이유는 확인되지 않았다.
- Hypotheses and outstanding checks: URL 발급 범위 또는 셸 인증 맥락 차이 가능성. 확인되지 않은 가설이다.
- Impact: 코디 이미지 12개, Empty State 원본 2개, 알림 벨 Vector, 회원탈퇴 경고 Vector, 토글 원본 SVG를 로컬에 배치하지 못했다.

## 5. Resolution Plan

- Recommended solution: 접근 가능한 공식 Figma 원본 PNG/SVG 파일을 확보한 후 `src/assets/images/mypage/`에 저장한다.
- Related files to change: `src/mocks/archive.ts`, `src/components/mypage/ArchiveEmptyState.tsx`, `src/pages/mypage/MyPage.tsx`, `src/components/mypage/AccountConfirmationDialog.tsx`, 필요 시 `NotificationToggle.tsx`.
- Resolution steps: 원본 파일의 비어 있지 않음과 치수를 확인하고 각 디자인 슬롯에 연결한 뒤 375×812 및 320×568에서 렌더링을 비교한다.
- Alternatives and precautions: Figma 화면 전체 스크린샷을 개별 에셋으로 잘라 쓰지 않는다. 임시 URL을 런타임 코드에 넣지 않는다.

## 6. Verification Plan

- Error reproduction check: 공식 원본 파일을 로컬에서 열 수 있는지 확인
- Related feature tests: 이미지 비율, `object-fit: cover`, Empty State 두 종류, 알림 벨 및 경고 아이콘 배치 확인
- Regression tests: `typecheck`, `lint`, `format:check`, `build`, 모바일 뷰포트 브라우저 확인
- Acceptance criteria: 모든 원본 파일이 로컬에 존재하고 각 Figma 슬롯과 일치

## 7. Resume Point

- Interrupted task: Figma 이미지 및 Vector 최종 적용
- Completed prerequisites: 4개 기능 단계와 통합 브라우저 검증
- Resume location: [아카이브 에셋 메모](../screenshots/issue-23/archive/README.md)
- Remaining work: 공식 원본 확보와 시각 검증

## 8. Final Resolution

- Solution applied: 미적용. 에셋 의존성을 별도 기록하고 기능 흐름은 Mock으로 검증했다.
- Verification results: 임시 슬롯의 목록·Empty State·반응형과 접근성 동작은 통과. 원본 에셋 시각 검증은 미실행.
- Final status: Blocked (원본 파일 접근)
- Resolution date and time: 미정
