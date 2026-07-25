export type StatsPeriod = 'week' | 'month' | 'quarter' | 'all';

export const STATS_PERIODS: StatsPeriod[] = [
  'week',
  'month',
  'quarter',
  'all',
];

export function is_stats_period(
  value: string,
): value is StatsPeriod {
  return (STATS_PERIODS as string[]).includes(value);
}
