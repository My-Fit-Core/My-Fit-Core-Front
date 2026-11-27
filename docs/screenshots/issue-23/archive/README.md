# 아카이브 에셋 및 검증 메모

- Figma 조회: 좋아요 목록 `482:10440`, Empty `491:2313`, 게시물 목록 `484:10499`, Empty `491:2393`, 카드 `1039:19984`.
- 미완료: 목록 코디 이미지 각 6개, 좋아요 Empty 마스코트 `491:2391`, 게시물 Empty 이미지 `491:2435`. Figma MCP가 제공한 원본 에셋 URL의 `curl` 다운로드가 HTTP 403으로 실패했다.
- 현재는 3:4 이미지 슬롯과 214×214 Empty 이미지 슬롯을 임시 표시한다. Figma 이미지 적용 또는 시각 일치 검증 완료로 간주하지 않는다.
- 후속 작업: Figma 원본 PNG 파일을 확보해 `src/assets/images/mypage/`에 저장하고 `src/mocks/archive.ts`의 이미지 경로와 `ArchiveEmptyState.tsx`의 두 이미지 슬롯에 각각 연결한다. 원본 비율과 `object-fit: cover`를 브라우저에서 확인한다.
- 개발 환경에서는 `/mypage/likes?empty=1` 및 `/mypage/posts?empty=1`로 Empty State를 재현한다. 첫 좋아요 목록의 마지막 카드는 의도적으로 누락된 이미지 경로를 사용해 로딩 실패 처리를 확인한다.
