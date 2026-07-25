export const CALLBACK = {
  NAV_MENU: 'nav:menu',
  NAV_ACTIVITIES: 'nav:activities',
  NAV_SYMPTOMS: 'nav:symptoms',
  NAV_RATING: 'nav:rating',
  NAV_TODAY: 'nav:today',
  NAV_STATS: 'nav:stats',
  NAV_EXPORT: 'nav:export',
  DONE_ACTIVITIES: 'done:activities',
  DONE_SYMPTOMS: 'done:symptoms',
  DONE_RATING: 'done:rating',
} as const;

export function act_toggle(activity_key: string): string {
  return `act:toggle:${activity_key}`;
}

export function sym_toggle(symptom_key: string): string {
  return `sym:toggle:${symptom_key}`;
}

export function rat_set(rating: number): string {
  return `rat:set:${rating}`;
}
