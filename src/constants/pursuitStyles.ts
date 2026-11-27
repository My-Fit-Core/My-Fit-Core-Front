export const PURSUIT_STYLES = {
  feminine: '페미닌',
  y2k: 'Y2K',
  minimal: '미니멀',
  vintage_layered: '빈티지 레이어드',
  casual: '캐주얼',
} as const;

export type PursuitStyleId = keyof typeof PURSUIT_STYLES;
