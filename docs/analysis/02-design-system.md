# 디자인 시스템 분석

- 분석일: 2026-11-24
- 출처: Figma `2:4` [디자인 시스템](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-4), `get_metadata`, `get_design_context`(`1018:19459`, `1018:19461`)
- 소유자: 다른 프론트엔드 팀원. 이 문서는 사용 요구를 정리하며 `tokens.css`를 변경하지 않는다.

## 확인된 색상 예시

| Figma 출처                 | 화면에 표시된 값            | 성격/용도          | 코드 적용          |
| -------------------------- | --------------------------- | ------------------ | ------------------ |
| 컬러시스템 `53:276`        | `#BCBCBC`                   | 회색 팔레트 기본색 | 팀원 토큰명 협의   |
| 컬러시스템 `53:297`        | `#CEF3CC`                   | 초록 팔레트 기본색 | 팀원 토큰명 협의   |
| 컬러시스템 `53:309`        | `#E9D1F9`                   | 보라 팔레트 기본색 | 팀원 토큰명 협의   |
| 컬러시스템 `58:340`        | `#F6DBEE`                   | 분홍 팔레트 기본색 | 팀원 토큰명 협의   |
| 컬러시스템 `53:278-294` 등 | 기본색의 0.9~0.1 alpha 단계 | 팔레트 단계        | 불투명도 방식 협의 |

위 값은 **Frame의 실제 Fill**이며, 공식 Variable로 확인된 값은 아니다. `get_variable_defs`는 `2:4`와 `2:6` 모두 “You currently have nothing selected”를 반환해 Variable 이름·Mode·참조관계를 확인하지 못했다. 따라서 팔레트 값을 임의의 확정 토큰으로 기록하지 않는다. 최종 디자인의 `#9478B2`(사진 모드 탭), `#FEE500`(Kakao 버튼) 등은 개별 컴포넌트 값으로 별도 취급한다.

## 타이포그래피

`폰트` Frame `1018:19461`의 실제 샘플과 컨텍스트에 다음이 확인된다.

| Figma 스타일 표기     | 글꼴/무게                                     |          크기 | 샘플 Node                                |
| --------------------- | --------------------------------------------- | ------------: | ---------------------------------------- |
| Display               | A2Z Bold                                      |          50px | `109:36`                                 |
| Heading 1 (한글)      | A2Z SemiBold                                  |          35px | `109:23`                                 |
| Heading 2 (한글)      | A2Z Medium                                    |          28px | `109:34`                                 |
| Subheading 1/2 (한글) | A2Z Regular/Light                             |          20px | `109:38`, `109:40`                       |
| Body 1 (한글)         | A2Z ExtraLight                                |          16px | `109:42`                                 |
| Caption (한글)        | A2Z Thin                                      |          12px | `109:51`                                 |
| 영문 로고 샘플        | Playfair Display Bold/SemiBold/Medium/Regular | 36/24/20/16px | `315:1383`, `53:325`, `72:281`, `72:283` |

컨텍스트에는 A2Z의 약 5% 자간과 100% lineHeight 스타일 설명이 있으나, 실제 브라우저 폰트 파일·배포 허가·최종 폰트 로딩은 확인되지 않았다. 최종 디자인 일부는 Noto Sans KR, Pretendard, Roboto도 사용하므로 모두 A2Z로 치환하지 않는다.

## 레이아웃과 컴포넌트

- 다수의 최종 화면은 375×812px Frame이다. 이는 기준 화면 크기이지 고정 viewport 요구는 아니다.
- 원본 `Navigation Bar` `334:23367`: 335×45px, 반투명 바탕, 90px radius, 그림자. `navBar / closet/social/stylemixer/calendar` Variant Set 후보와 아이콘 원본이 있다.
- `Button`은 크기/상태가 다른 Set 후보 3개(`329:1499`, `329:1549`, `329:1561`)에 분산되어 있다. 같은 이름이어도 Node ID가 달라 일괄 단일 API로 가정하지 않는다.
- `ClosetCard` `329:1557`, `Option 1~4`, `Weather Bar`, `Rating`, 아이콘 계열은 [전체 목록](03-component-inventory.md)에 있다.
- 색상 외 spacing, border, radius, shadow의 **공식 Variable/Style 체계**는 확인되지 않았다. 각 최종 디자인 컨텍스트의 수치는 화면별 직접 값으로 기록한다.

## 팀원에게 우선 요청할 계약

1. 색상·타이포그래피·간격·radius 변수의 실제 명칭, Mode 및 CSS/Tailwind v4 노출 방식.
2. Button(회색·초록·disabled·긴 CTA), Navigation Bar, Icons prev/add/delete/camera/gallery, Category 선택 UI, Status Bar의 Props·상태·사용 예시.
3. `ClosetCard`와 최종 옷장 화면의 `ClosetItemCard`가 같은 원본인지 확인. 후자의 참조 ID `587:10660`은 2:4/2:6 원본 목록에서 찾지 못해 담당자·제공 경로가 미확정이다.
4. 앱의 OS status/home indicator 렌더링 책임과 safe area 정책.

**구현 제안:** 팀원이 결정한 CSS 변수 또는 Tailwind v4 `@theme` 매핑을 재사용한다. 매핑이 나오기 전에는 문서상 Figma 값을 참조하되 임의의 `tokens.css` 값을 확정하지 않는다.
