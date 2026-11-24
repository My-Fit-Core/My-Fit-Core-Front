# MAPIKO 프론트엔드 사전 분석 인덱스

- 분석일: 2026-11-24 (Asia/Seoul)
- 분석 브랜치: docs/figma-analysis
- 기준 Commit: 2db91badb9f9398cfe127f3d66934b7cf031a76f
- Figma File Key: XhhPLJSwkdCMAJgzqFLELf
- 기준 페이지: [최종 디자인 2:6](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-6), [디자인 시스템 2:4](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-4), [참고 와이어프레임 2:5](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-5)
- GitHub: [My-Fit-Core/My-Fit-Core-Front](https://github.com/My-Fit-Core/My-Fit-Core-Front); PR #2·#3은 2026-11-24 조회 시 open·미병합

## 문서 지도

| 파일                                                             | 다음 개발 작업에서 찾을 내용                                |
| ---------------------------------------------------------------- | ----------------------------------------------------------- |
| [01-project-overview.md](01-project-overview.md)                 | 현재 코드·브랜치·PR, 소유권, 착수 조건                      |
| [02-design-system.md](02-design-system.md)                       | 확인된 색·폰트와 팀원 토큰/공통 UI 요청                     |
| [03-component-inventory.md](03-component-inventory.md)           | 두 페이지의 모든 원본 symbol, Set 후보·Variant, Node ID     |
| [04-component-specifications.md](04-component-specifications.md) | 사용자 담당 28개 독립 단위 후보의 구현 명세·Props 제안      |
| [05-page-specifications.md](05-page-specifications.md)           | 81개 Frame 추적표, 사용자 담당 54개 화면/상태의 흐름별 명세 |
| [06-implementation-plan.md](06-implementation-plan.md)           | 의존관계·우선순위·Issue 초안·Acceptance Criteria            |
| [07-open-questions.md](07-open-questions.md)                     | 차단 결정·도구 한계·미분석 범위·다음 조회 순서              |

## 집계와 판정

| 항목                        | 디자인 시스템 2:4 | 최종 디자인 2:6 | 합계 |
| --------------------------- | ----------------: | --------------: | ---: |
| 원본 Component(symbol) 노드 |                78 |              35 |  113 |
| Component Set 후보          |                14 |               6 |   20 |
| Set 하위 Variant            |                38 |              13 |   51 |
| 독립 구현 단위 후보         |         54 (팀원) |     28 (사용자) |   82 |

메타데이터는 Figma의 네이티브 Component Set 타입과 Instance의 mainComponent ID를 제공하지 않는다. 따라서 Set 및 구현 단위 수는 부모 Frame 아래 Variant 이름을 가진 symbol을 묶은 **후보 집계**다. 최종 페이지에는 81개 기준 크기 화면 Frame이 있고, 사용자 담당 실제 화면/상태 Frame은 54개다. 사용자 담당 54개 Frame 모두 상세 조회했고 대표 6개는 별도 스크린샷으로 확인했다. 중복 상태 Frame을 별도 페이지 구현 단위로 세지 않는다.

## 진행 상태

| Phase                | 상태       | 근거/남은 일                                                             |
| -------------------- | ---------- | ------------------------------------------------------------------------ |
| 1 프로젝트 환경      | 완료       | 로컬·PR #2/#3·최신 PR #3 문서와 현재 브랜치 차이 확인                    |
| 2 Figma 전체 구조    | 부분 완료  | 전체 XML·원본/화면 목록 확보; 네이티브 Set·Instance 연결 미확인          |
| 3 디자인 시스템·의존 | 부분 완료  | 색·폰트 샘플/공통 컴포넌트 후보 확인; Variable 도구 오류                 |
| 4 사용자 원본 상세   | 부분 완료  | 28개 단위 전부 상세 조회·문서화; 네이티브 Set 타입·동작 계약 미확인      |
| 5 사용자 페이지 상세 | 부분 완료  | 54개 Frame 추적·흐름 명세와 전부 상세 조회; Prototype·반응형 제약 미확인 |
| 6 개발 계획          | 완료(초안) | Issue는 Markdown 초안만 작성, 번호/담당 확정 전                          |
| 7 최종 검증          | 부분 완료  | 문서 참조·집계·수정 범위 확인; 미확정 Figma/API 항목 남음                |

## 개발 의존성과 다음 세션

1. 공통 UI 담당에게 토큰, Button/Icons/Navigation Bar 사용 계약을 요청하고 ClosetItemCard의 원본·담당을 확인한다. PR #2·#3 병합 여부도 확인한다.
2. 사용자 소유 Kakao 버튼과 옷장 검수/분류·마이페이지 알림 원본은 팀원 페이지에서 사용 여부를 확인한 뒤 공유한다.
3. UI 착수 순서는 스플래시·로그인 Mock/인증 분기 계약 → 옷장 목록·등록/검수 → 마이페이지 → 상세/상태 검증을 권장한다. 병렬 작업은 [구현 계획](06-implementation-plan.md)을 참조한다.
4. 분석을 이어갈 때 [미확정 범위](07-open-questions.md)를 확인하고, Prototype·반응형 제약과 원본 연결부터 조회한다. 현재 문서의 “사실/제안/미확정” 표시를 유지한다.

이번 작업은 Markdown 문서 작성만 수행했다. React 코드·Figma 원본·GitHub Issue/PR·브랜치/Commit은 변경하지 않았다.
