import { DayRecord } from '@domain/aggregations/day-record/day-record.aggregation';
import { Activity } from '@domain/entities/activity/activity.entity';
import { Symptom } from '@domain/entities/symptom/symptom.entity';

import {
  DayRecordTextMapper,
  StatisticsTextMapper,
  SymptomStatsTextMapper,
} from './view-text.mapper';

describe('DayRecordTextMapper', () => {
  describe('to_text', () => {
    it('should render day summary with labels', () => {
      const text = DayRecordTextMapper.to_text({
        day: new DayRecord({
          chat_id: 1,
          date: '2026-07-25',
          rating: 8,
          activity_keys: ['honey'],
          symptom_keys: ['itch'],
        }),
        activities: [
          new Activity({
            key: 'honey',
            label: 'мед',
            category_key: 'food',
            category_label: 'Їжа',
          }),
        ],
        symptoms: [
          new Symptom({
            key: 'itch',
            label: 'свербіж',
            category_key: 'skin',
            category_label: 'Шкіра',
          }),
        ],
      });

      expect(text).toContain('2026-07-25');
      expect(text).toContain('Оцінка шкіри: 8');
      expect(text).toContain('мед');
      expect(text).toContain('свербіж');
    });
  });
});

describe('StatisticsTextMapper', () => {
  describe('to_text', () => {
    it('should render empty state when stats is null', () => {
      const text = StatisticsTextMapper.to_text({
        stats: null,
        activities: [],
      });

      expect(text).toContain('Замало даних');
    });

    it('should render tops when stats exist', () => {
      const text = StatisticsTextMapper.to_text({
        stats: {
          correlations: [],
          top_negative: [
            {
              activity_key: 'honey',
              avg_with: 3,
              avg_without: 7,
              diff: -4,
            },
          ],
          top_positive: [],
        },
        activities: [
          new Activity({
            key: 'honey',
            label: 'мед',
            category_key: 'food',
            category_label: 'Їжа',
          }),
        ],
      });

      expect(text).toContain('мед');
      expect(text).toContain('Топ негативних');
    });
  });
});

describe('SymptomStatsTextMapper', () => {
  describe('to_text', () => {
    it('should render empty state when stats is null', () => {
      const text = SymptomStatsTextMapper.to_text({
        period: 'week',
        stats: null,
        activities: [],
        symptoms: [],
      });

      expect(text).toContain('тиждень');
      expect(text).toContain('Замало даних');
    });

    it('should render cooccurrence blocks', () => {
      const text = SymptomStatsTextMapper.to_text({
        period: 'all',
        stats: [
          {
            symptom_key: 'itch',
            days: 3,
            activities: [
              { key: 'honey', days: 2, percent: 67 },
            ],
            symptoms: [
              { key: 'redness', days: 2, percent: 67 },
            ],
          },
        ],
        activities: [
          new Activity({
            key: 'honey',
            label: 'мед',
            category_key: 'food',
            category_label: 'Їжа',
          }),
        ],
        symptoms: [
          new Symptom({
            key: 'itch',
            label: 'свербіж',
            category_key: 'skin',
            category_label: 'Шкіра',
          }),
          new Symptom({
            key: 'redness',
            label: 'почервоніння',
            category_key: 'skin',
            category_label: 'Шкіра',
          }),
        ],
      });

      expect(text).toContain('свербіж — 3 дн.');
      expect(text).toContain('мед — 2 (67%)');
      expect(text).toContain('почервоніння — 2 (67%)');
    });
  });
});
