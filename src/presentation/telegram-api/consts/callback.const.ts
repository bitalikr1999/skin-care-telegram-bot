export const CALLBACK = {
  NAV_MENU: 'nav:menu',
  NAV_ACTIVITIES: 'nav:activities',
  NAV_SYMPTOMS: 'nav:symptoms',
  NAV_RATING: 'nav:rating',
  NAV_TODAY: 'nav:today',
  NAV_STATS_RATING: 'nav:stats:rating',
  NAV_STATS_SYMPTOMS: 'nav:stats:symptoms',
  NAV_EXPORT: 'nav:export',
  DONE_ACTIVITIES: 'done:activities',
  DONE_SYMPTOMS: 'done:symptoms',
  DONE_RATING: 'done:rating',
} as const;

export class CallbackData {
  public static act_toggle(activity_key: string): string {
    return `act:toggle:${activity_key}`;
  }

  public static sym_toggle(symptom_key: string): string {
    return `sym:toggle:${symptom_key}`;
  }

  public static rat_set(rating: number): string {
    return `rat:set:${rating}`;
  }

  public static stats_period(period: string): string {
    return `stats:period:${period}`;
  }
}
