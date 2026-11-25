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
3. `ClosetCard`와 `ClosetItemCard`의 구조를 구분한다. 후자의 새 구현 기준 원본 `1039:19987`은 2:6에서 확인됐고 사용자 담당이다. 기존 화면 Instance가 새 노드를 직접 참조하는지는 미확인이다.
4. 앱의 OS status/home indicator 렌더링 책임과 safe area 정책.

**구현 제안:** 팀원이 결정한 CSS 변수 또는 Tailwind v4 `@theme` 매핑을 재사용한다. 매핑이 나오기 전에는 문서상 Figma 값을 참조하되 임의의 `tokens.css` 값을 확정하지 않는다.

## 최신 로고·폰트·공통 UI 계약

**최신 사용자 결정:** MAPIKO 로고 디자인은 확정됐다. 제공 에셋 이름은 `image 2.svg`, `반짝이는 크롬 풍선 글자 MyFitCore 1.svg`다. 현재 저장소의 추적 파일과 작업 트리에서 두 SVG는 발견되지 않았다. 실제 파일 전달·라이선스/사용권 확인 후 `mapiko-symbol.svg`, `mapiko-wordmark.svg` 같은 이름으로 배치하는 것은 후속 개발 Issue의 제안이다. 과거 Figma의 임시 텍스트 로고 정책은 적용하지 않는다.

전역 폰트·디자인 토큰은 디자인 시스템 담당 팀원이 제공한다. A2Z 파일과 라이선스 확보 여부를 확인하고, 불가하면 Figma 설명 보드의 Noto Sans KR 임시 대체안을 사용한다. 최종 폰트·CSS 변수명은 협의 전이며 사용자 페이지에서 전역 체계를 중복 만들지 않는다. 팀원에게 토큰·폰트, Button, Icons, Navigation Bar, Option/Chip, 입력 UI, 공통 레이아웃·Safe Area의 Props·경로·사용 예시를 우선 요청한다.

## 의류 카테고리 공통 정의

**최신 사용자 결정:** 7개 대분류와 32개 소분류를 사용한다. 영어 식별자는 제공된 표 그대로 유지하고 한국어는 구현용 표시명이다. 실제 API 필드명·enum·응답 형식은 백엔드·AI팀 확인 전이다. `전체 카테고리`는 필터 옵션이며 의류 카테고리 값이 아니다. 과거 Figma의 양말·장갑·아이웨어·벨트 등은 최신 분류표에 없으므로 구현 상수에 추가하지 않는다.

| 대분류 ID   | 표시명   | 소분류 ID → 한국어 표시명                                                                                                | 개수 |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------ | ---: |
| `top`       | 상의     | `tshirt` 티셔츠, `shirt` 셔츠, `blouse` 블라우스, `knit` 니트, `hoodie` 후드티, `sweatshirt` 맨투맨, `sleeveless` 민소매 |    7 |
| `bottom`    | 하의     | `jeans` 청바지, `slacks` 슬랙스, `shorts` 반바지, `mini_skirt` 미니스커트, `long_skirt` 롱스커트                         |    5 |
| `dress`     | 원피스   | `mini_dress` 미니 원피스, `long_dress` 롱 원피스                                                                         |    2 |
| `outerwear` | 아우터   | `jacket` 재킷, `blazer` 블레이저, `coat` 코트, `cardigan` 가디건, `padding` 패딩                                         |    5 |
| `shoes`     | 신발     | `sneakers` 운동화, `flats` 플랫슈즈, `loafers` 로퍼, `heels` 힐, `boots` 부츠, `sandals` 샌들                            |    6 |
| `bag`       | 가방     | `shoulder_bag` 숄더백, `tote_bag` 토트백, `backpack` 백팩, `crossbody_bag` 크로스백                                      |    4 |
| `accessory` | 액세서리 | `hat` 모자, `scarf` 스카프·머플러, `jewelry` 주얼리                                                                      |    3 |

**구현 제안:** `src/constants/clothingCategories.ts` 같은 단일 정의와 `src/types/clothing.ts`의 공통 타입을 옷장·검수·상세·착용 선택에서 재사용한다. `CategoryFilterTrigger`, `CategoryRow`, `ClothingCategoryEditor`, `AccessoryCategoryEditor`, AI 검수 및 팀원 STC-001 페이지가 소비한다. 실제 시트 전환과 선택 UI는 기존 Figma 상태를 기준으로 하되 목록 값은 이 최신 결정으로 교체한다.

최종 추구미 표시명은 **페미닌, Y2K, 미니멀, 빈티지 레이어드, 캐주얼**이다. 그루지/그런지는 사용하지 않는다. 대표 1개·보조 최대 2개 규칙을 온보딩·홈·마이페이지·피드에서 공유한다. 영문 식별자는 백엔드·AI 확인 전이다.
