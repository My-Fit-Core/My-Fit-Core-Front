import type { PursuitStyleId } from '@/constants/pursuitStyles';

export type PursuitPreferences = {
  primaryStyle: PursuitStyleId;
  secondaryStyles: PursuitStyleId[];
};
