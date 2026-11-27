export type NotificationSettings = {
  enabled: boolean;
  time: string;
};

// UI 개발 전용 메모리 저장소. 새로고침하면 초기값으로 돌아간다.
let savedSettings: NotificationSettings = { enabled: true, time: '08:30' };

export function getNotificationSettings(): NotificationSettings {
  return { ...savedSettings };
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  savedSettings = { ...settings };
}
