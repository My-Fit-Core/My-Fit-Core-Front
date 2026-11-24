# MAPIKO 프론트엔드 사전 분석 인덱스

- 최신 보완일: 2026-11-24 (Asia/Seoul)
- 작업 브랜치: `docs/figma-analysis`; 보완 전 Commit: `b0abfb4`
- Figma File Key: `XhhPLJSwkdCMAJgzqFLELf`
- 시각 기준: [최종 디자인 2:6](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-6); 공통 UI·토큰: [디자인 시스템 2:4](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-4); 흐름 참고: [와이어프레임 2:5](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-5)
- [GitHub PR #5](https://github.com/My-Fit-Core/My-Fit-Core-Front/pull/5)는 open·미병합이며 HEAD는 `b0abfb4`. [PR #2](https://github.com/My-Fit-Core/My-Fit-Core-Front/pull/2) Tailwind 설정과 [PR #3](https://github.com/My-Fit-Core/My-Fit-Core-Front/pull/3) 협업 규칙도 2026-11-24 조회 시 open·미병합.
- 최신 기획 결정은 사용자 제공 2026-11-24 요청문을 기준으로 했다. [Notion 요구사항정의](https://app.notion.com/p/3f7ff3436dff805bb67bf9d0aa6ea078)와 [공통규칙](https://app.notion.com/p/422ff3436dff801d899bf4dabdff399a)는 이번 작업에서 직접 조회하지 않았다.

## 문서 지도와 진행 상태

| 문서                                               | 최신 내용                                             | 상태                            |
| -------------------------------------------------- | ----------------------------------------------------- | ------------------------------- |
| [01 프로젝트](01-project-overview.md)              | 코드·브랜치·PR·담당 경계                              | 보완 완료                       |
| [02 디자인 시스템](02-design-system.md)            | 확인된 색·폰트, 로고, 카테고리 7/32, 공통 UI 계약     | 보완 완료; 토큰명 미확정        |
| [03 원본 인벤토리](03-component-inventory.md)      | 117개 원본, 20개 Set 후보, 새 기준 노드 4개           | 보완 완료; Instance 연결 미확정 |
| [04 컴포넌트 명세](04-component-specifications.md) | 사용자 32개 단위 후보, 새 4개 상세, Props 제안        | 보완 완료; API·일부 상태 미확정 |
| [05 화면 명세](05-page-specifications.md)          | 81개 Frame 추적, 사용자 44개, 설명 보드·요구사항 연결 | 보완 완료; Prototype 미확정     |
| [06 구현 계획](06-implementation-plan.md)          | 일정, Issue 초안, 32개 원본 매핑, 모바일 초기 검증    | 보완 완료; 실제 Issue 미생성    |
| [07 미확정 사항](07-open-questions.md)             | 해결·사용자 결정·팀 합의·백엔드·기술·Figma 한계       | 보완 완료                       |

## 최종 집계

| 항목                | 디자인 시스템 2:4·팀원 | 최종 디자인 2:6·사용자 | 전체 |
| ------------------- | ---------------------: | ---------------------: | ---: |
| 원본 Component      |                     78 |                     39 |  117 |
| Component Set 후보  |                     14 |                      6 |   20 |
| Set 하위 Variant    |                     38 |                     13 |   51 |
| 독립 Component      |                     40 |                     26 |   66 |
| 독립 구현 단위 후보 |                     54 |                     32 |   86 |

Figma MCP 메타데이터의 `<symbol>`을 원본 Component로 집계했다. 네이티브 Component Set 유형과 기존 화면 Instance의 `mainComponent` 연결은 확인되지 않아 Set·구현 단위 수는 **후보**다. 2:6의 새 `symbol` 4개(`1039:19984`~`1039:19987`)는 내부에 기존 Instance를 포함한다. 새 구현 기준 노드의 존재와 기존 화면 연결 변경을 혼동하지 않는다.

화면 추적 대상 Frame **81개**는 375×812px 화면·상태 **79개**와 개발 설명 보드 **2개**(`418:10414` 370×812px, `403:10251` 394×812px)다. 사용자 담당 **44개 화면·상태**는 스플래시·로그인 2, 옷장 28, 마이페이지 14다. STC-001 착용 선택 5개는 팀원 페이지 담당안(최종 합의 전), STC-005 보관함·폴더 5개는 팀원 담당·구형 화면 채택 확인 전이다. Frame 수는 React Page 파일 수가 아니다.

## 최신 결정과 다음 계약

- 로고 디자인 확정. 제공 SVG 2종은 현재 저장소에서 확인되지 않아 전달·배치는 후속 개발 작업이다.
- 추구미는 페미닌·Y2K·미니멀·빈티지 레이어드·캐주얼. 의류는 7대분류·32소분류. 영어 카테고리 ID는 사용자 제공값을 유지한다.
- 원샷 촬영의 카메라 가이드 오버레이는 제외. 촬영·갤러리·AI 검수·저장과 온보딩 별도 안내는 유지한다.
- 마이페이지 Navigation Bar는 메인 `418:10290`에만 표시하고 하위 페이지에서는 숨긴다.
- 독립 약관 동의 React Page는 이번 UI 범위에 넣지 않는다. 자체 서비스 약관 동의와 카카오 개인정보 제공 동의는 별도 정책 확인이 필요하다.
- 디자인 시스템 토큰·폰트·Button·Icons·Navigation Bar·Option/Chip·입력·레이아웃·Safe Area 계약은 팀원에게 요청한다. API·AI·모바일 패키징은 [미확정 사항](07-open-questions.md)을 따른다.

이번 보완은 `docs/analysis/` Markdown만 수정한다. Figma 원본, React 코드, GitHub Issue/PR, 브랜치, Commit·Push는 변경하지 않는다.
