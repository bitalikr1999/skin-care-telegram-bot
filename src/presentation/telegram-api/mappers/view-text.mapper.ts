import { DayRecord } from '@domain/aggregations/day-record/day-record.aggregation';
import { Activity } from '@domain/entities/activity/activity.entity';
import { Symptom } from '@domain/entities/symptom/symptom.entity';
import { IStatisticsResult } from '@domain/interfaces/statistics.interface';

export class DayRecordTextMapper {
  public static to_text(params: {
    day: DayRecord;
    activities: Activity[];
    symptoms: Symptom[];
  }): string {
    const activity_labels = new Map(
      params.activities.map((item) => [item.key, item.label]),
    );
    const symptom_labels = new Map(
      params.symptoms.map((item) => [item.key, item.label]),
    );

    const activities = params.day.activity_keys
      .map((key) => activity_labels.get(key) ?? key)
      .join(', ');
    const symptoms = params.day.symptom_keys
      .map((key) => symptom_labels.get(key) ?? key)
      .join(', ');

    return [
      `📋 Запис за ${params.day.date}`,
      '',
      `Оцінка шкіри: ${params.day.rating ?? '—'}`,
      `Активності: ${activities || '—'}`,
      `Симптоми: ${symptoms || '—'}`,
    ].join('\n');
  }
}

export class StatisticsTextMapper {
  public static to_text(params: {
    stats: IStatisticsResult | null;
    activities: Activity[];
  }): string {
    if (!params.stats) {
      return '📈 Замало даних для статистики (потрібно щонайменше 3 дні з оцінкою).';
    }

    const labels = new Map(
      params.activities.map((item) => [item.key, item.label]),
    );

    const format_row = (item: {
      activity_key: string;
      avg_with: number;
      avg_without: number;
      diff: number;
    }) => {
      const label =
        labels.get(item.activity_key) ?? item.activity_key;
      return `${label}: з=${item.avg_with.toFixed(1)} без=${item.avg_without.toFixed(1)} Δ=${item.diff.toFixed(1)}`;
    };

    const negative = params.stats.top_negative
      .map(format_row)
      .join('\n');
    const positive = params.stats.top_positive
      .map(format_row)
      .join('\n');

    return [
      '📈 Статистика (кореляція, не причинність)',
      '',
      'Топ негативних:',
      negative || '—',
      '',
      'Топ позитивних:',
      positive || '—',
      '',
      '⚠️ Це кореляція, не причинно-наслідковий доказ.',
    ].join('\n');
  }
}
