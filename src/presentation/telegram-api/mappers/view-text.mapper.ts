import { DayRecord } from '@domain/aggregations/day-record/day-record.aggregation';
import { StatsPeriod } from '@domain/consts/stats-period.const';
import { Activity } from '@domain/entities/activity/activity.entity';
import { Symptom } from '@domain/entities/symptom/symptom.entity';
import { IStatisticsResult } from '@domain/interfaces/statistics.interface';
import { ISymptomCooccurrence } from '@domain/interfaces/symptom-stats.interface';

const PERIOD_LABEL: Record<StatsPeriod, string> = {
  week: 'тиждень',
  month: 'місяць',
  quarter: '3 місяці',
  all: 'весь час',
};

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
      return [
        '📈 Оцінка і активності',
        '',
        'Замало даних (потрібно щонайменше 3 дні з оцінкою).',
      ].join('\n');
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
      '📈 Оцінка і активності (кореляція, не причинність)',
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

export class SymptomStatsTextMapper {
  public static to_text(params: {
    period: StatsPeriod;
    stats: ISymptomCooccurrence[] | null;
    activities: Activity[];
    symptoms: Symptom[];
  }): string {
    const period_label = PERIOD_LABEL[params.period];

    if (!params.stats) {
      return [
        `🔍 Симптоми разом (${period_label})`,
        '',
        'Замало даних (потрібно щонайменше 3 дні з симптомами).',
      ].join('\n');
    }

    const activity_labels = new Map(
      params.activities.map((item) => [item.key, item.label]),
    );
    const symptom_labels = new Map(
      params.symptoms.map((item) => [item.key, item.label]),
    );

    const blocks = params.stats.map((item) => {
      const symptom_label =
        symptom_labels.get(item.symptom_key) ?? item.symptom_key;
      const activities = SymptomStatsTextMapper._format_related({
        items: item.activities,
        labels: activity_labels,
      });
      const symptoms = SymptomStatsTextMapper._format_related({
        items: item.symptoms,
        labels: symptom_labels,
      });

      return [
        `${symptom_label} — ${item.days} дн.`,
        'Часто разом:',
        activities,
        'Інші симптоми:',
        symptoms,
      ].join('\n');
    });

    return [
      `🔍 Симптоми разом (${period_label})`,
      '',
      ...blocks.flatMap((block, index) =>
        index === 0 ? [block] : ['', block],
      ),
      '',
      '⚠️ Співпадіння в ті самі дні, не причинність.',
    ].join('\n');
  }

  private static _format_related(params: {
    items: Array<{ key: string; days: number; percent: number }>;
    labels: Map<string, string>;
  }): string {
    if (params.items.length === 0) {
      return '—';
    }

    return params.items
      .map((item) => {
        const label = params.labels.get(item.key) ?? item.key;
        return `• ${label} — ${item.days} (${item.percent}%)`;
      })
      .join('\n');
  }
}
