import { IDiaryDaySnapshot } from '../interfaces/symptom-stats.interface';

import { SymptomStatsUtils } from './symptom-stats.util';

describe('SymptomStatsUtils', () => {
  describe('calculate_cooccurrences', () => {
    it('should return null when days with symptoms less than 3', () => {
      const days: IDiaryDaySnapshot[] = [
        {
          date: '2026-01-01',
          activity_keys: ['honey'],
          symptom_keys: ['itch'],
        },
        {
          date: '2026-01-02',
          activity_keys: [],
          symptom_keys: ['itch'],
        },
      ];

      expect(
        SymptomStatsUtils.calculate_cooccurrences(days),
      ).toStrictEqual(null);
    });

    it('should return top symptoms with cooccurrences', () => {
      const days: IDiaryDaySnapshot[] = [
        {
          date: '2026-01-01',
          activity_keys: ['honey', 'stress'],
          symptom_keys: ['itch', 'redness'],
        },
        {
          date: '2026-01-02',
          activity_keys: ['honey'],
          symptom_keys: ['itch'],
        },
        {
          date: '2026-01-03',
          activity_keys: ['honey'],
          symptom_keys: ['itch', 'redness'],
        },
        {
          date: '2026-01-04',
          activity_keys: ['dairy'],
          symptom_keys: ['dryness'],
        },
      ];

      const result =
        SymptomStatsUtils.calculate_cooccurrences(days);

      expect(result).not.toBeNull();
      expect(result![0].symptom_key).toStrictEqual('itch');
      expect(result![0].days).toStrictEqual(3);
      expect(result![0].activities[0]).toStrictEqual({
        key: 'honey',
        days: 3,
        percent: 100,
      });
      expect(result![0].symptoms[0]).toStrictEqual({
        key: 'redness',
        days: 2,
        percent: 67,
      });
    });
  });
});
