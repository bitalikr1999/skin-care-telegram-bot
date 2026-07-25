import {
  IActivityCorrelation,
  IRatedDay,
  IStatisticsResult,
} from '../interfaces/statistics.interface';

const MIN_RATED_DAYS = 3;
const MIN_GROUP_DAYS = 2;
const TOP_COUNT = 3;

export function calculate_activity_correlations(
  days: IRatedDay[],
): IStatisticsResult | null {
  if (days.length < MIN_RATED_DAYS) {
    return null;
  }

  const activity_keys = new Set<string>();
  for (const day of days) {
    for (const activity_key of day.activity_keys) {
      activity_keys.add(activity_key);
    }
  }

  const correlations: IActivityCorrelation[] = [];

  for (const activity_key of activity_keys) {
    const with_activity: number[] = [];
    const without_activity: number[] = [];

    for (const day of days) {
      if (day.activity_keys.includes(activity_key)) {
        with_activity.push(day.rating);
      } else {
        without_activity.push(day.rating);
      }
    }

    if (
      with_activity.length < MIN_GROUP_DAYS ||
      without_activity.length < MIN_GROUP_DAYS
    ) {
      continue;
    }

    const avg_with = average(with_activity);
    const avg_without = average(without_activity);

    correlations.push({
      activity_key,
      avg_with,
      avg_without,
      diff: avg_with - avg_without,
    });
  }

  const sorted_by_diff = [...correlations].sort(
    (a, b) => a.diff - b.diff,
  );

  return {
    correlations,
    top_negative: sorted_by_diff.slice(0, TOP_COUNT),
    top_positive: [...sorted_by_diff].reverse().slice(0, TOP_COUNT),
  };
}

function average(values: number[]): number {
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
}
