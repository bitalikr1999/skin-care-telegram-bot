import {
  StatsPeriod,
  StatsPeriodUtils,
} from '@domain/consts/stats-period.const';

export type CallbackAction =
  | { kind: 'nav_menu' }
  | { kind: 'nav_activities' }
  | { kind: 'nav_symptoms' }
  | { kind: 'nav_rating' }
  | { kind: 'nav_today' }
  | { kind: 'nav_stats_rating' }
  | { kind: 'nav_stats_symptoms' }
  | { kind: 'stats_period'; period: StatsPeriod }
  | { kind: 'nav_export' }
  | { kind: 'done_menu' }
  | { kind: 'act_toggle'; activity_key: string }
  | { kind: 'sym_toggle'; symptom_key: string }
  | { kind: 'rat_set'; rating: number }
  | { kind: 'unknown' };

export class CallbackRouter {
  public static parse(data: string): CallbackAction {
    if (data === 'nav:menu') {
      return { kind: 'nav_menu' };
    }
    if (data === 'nav:activities') {
      return { kind: 'nav_activities' };
    }
    if (data === 'nav:symptoms') {
      return { kind: 'nav_symptoms' };
    }
    if (data === 'nav:rating') {
      return { kind: 'nav_rating' };
    }
    if (data === 'nav:today') {
      return { kind: 'nav_today' };
    }
    if (data === 'nav:stats:rating' || data === 'nav:stats') {
      return { kind: 'nav_stats_rating' };
    }
    if (data === 'nav:stats:symptoms') {
      return { kind: 'nav_stats_symptoms' };
    }
    if (data === 'nav:export') {
      return { kind: 'nav_export' };
    }
    if (
      data === 'done:activities' ||
      data === 'done:symptoms' ||
      data === 'done:rating'
    ) {
      return { kind: 'done_menu' };
    }

    if (data.startsWith('stats:period:')) {
      const period = data.slice('stats:period:'.length);
      if (!StatsPeriodUtils.is(period)) {
        return { kind: 'unknown' };
      }
      return { kind: 'stats_period', period };
    }

    if (data.startsWith('act:toggle:')) {
      return {
        kind: 'act_toggle',
        activity_key: data.slice('act:toggle:'.length),
      };
    }

    if (data.startsWith('sym:toggle:')) {
      return {
        kind: 'sym_toggle',
        symptom_key: data.slice('sym:toggle:'.length),
      };
    }

    if (data.startsWith('rat:set:')) {
      const rating = Number(data.slice('rat:set:'.length));
      if (!Number.isInteger(rating)) {
        return { kind: 'unknown' };
      }
      return { kind: 'rat_set', rating };
    }

    return { kind: 'unknown' };
  }
}
