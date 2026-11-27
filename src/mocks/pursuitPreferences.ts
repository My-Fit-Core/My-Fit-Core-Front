import type { PursuitPreferences } from '@/types/pursuit';

// UI 개발 전용 메모리 저장소. 새로고침하면 초기값으로 돌아간다.
let savedPreferences: PursuitPreferences = {
  primaryStyle: 'minimal',
  secondaryStyles: ['casual'],
};

export function getPursuitPreferences(): PursuitPreferences {
  return {
    primaryStyle: savedPreferences.primaryStyle,
    secondaryStyles: [...savedPreferences.secondaryStyles],
  };
}

export function savePursuitPreferences(preferences: PursuitPreferences): void {
  savedPreferences = {
    primaryStyle: preferences.primaryStyle,
    secondaryStyles: [...preferences.secondaryStyles],
  };
}
