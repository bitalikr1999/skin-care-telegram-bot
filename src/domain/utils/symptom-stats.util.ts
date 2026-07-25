import {
  ICooccurrenceItem,
  IDiaryDaySnapshot,
  ISymptomCooccurrence,
} from '../interfaces/symptom-stats.interface';

const MIN_DAYS_WITH_SYMPTOMS = 3;
const MIN_SYMPTOM_DAYS = 2;
const MIN_COOCCURRENCE_DAYS = 2;
const TOP_SYMPTOMS = 5;
const TOP_RELATED = 5;

export class SymptomStatsUtils {
  public static calculate_cooccurrences(
    days: IDiaryDaySnapshot[],
  ): ISymptomCooccurrence[] | null {
    const days_with_symptoms = days.filter(
      (day) => day.symptom_keys.length > 0,
    );

    if (days_with_symptoms.length < MIN_DAYS_WITH_SYMPTOMS) {
      return null;
    }

    const symptom_counts = new Map<string, number>();
    for (const day of days_with_symptoms) {
      for (const symptom_key of day.symptom_keys) {
        symptom_counts.set(
          symptom_key,
          (symptom_counts.get(symptom_key) ?? 0) + 1,
        );
      }
    }

    const top_symptoms = [...symptom_counts.entries()]
      .filter(([, count]) => count >= MIN_SYMPTOM_DAYS)
      .sort(SymptomStatsUtils._compare_count_desc)
      .slice(0, TOP_SYMPTOMS);

    if (top_symptoms.length === 0) {
      return null;
    }

    return top_symptoms.map(([symptom_key, days_count]) => {
      const matching_days = days_with_symptoms.filter((day) =>
        day.symptom_keys.includes(symptom_key),
      );

      return {
        symptom_key,
        days: days_count,
        activities: SymptomStatsUtils._top_cooccurrences({
          days: matching_days,
          pick_keys: (day) => day.activity_keys,
        }),
        symptoms: SymptomStatsUtils._top_cooccurrences({
          days: matching_days,
          pick_keys: (day) =>
            day.symptom_keys.filter(
              (key) => key !== symptom_key,
            ),
        }),
      };
    });
  }

  private static _top_cooccurrences(params: {
    days: IDiaryDaySnapshot[];
    pick_keys: (day: IDiaryDaySnapshot) => string[];
  }): ICooccurrenceItem[] {
    const counts = new Map<string, number>();

    for (const day of params.days) {
      const unique_keys = [...new Set(params.pick_keys(day))];
      for (const key of unique_keys) {
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }

    const total = params.days.length;

    return [...counts.entries()]
      .filter(([, days]) => days >= MIN_COOCCURRENCE_DAYS)
      .sort(SymptomStatsUtils._compare_count_desc)
      .slice(0, TOP_RELATED)
      .map(([key, days]) => ({
        key,
        days,
        percent: Math.round((days / total) * 100),
      }));
  }

  private static _compare_count_desc(
    left: [string, number],
    right: [string, number],
  ): number {
    if (right[1] !== left[1]) {
      return right[1] - left[1];
    }
    return left[0].localeCompare(right[0]);
  }
}
