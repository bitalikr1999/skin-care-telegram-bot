import { IRatedDay } from '../interfaces/statistics.interface';

import { StatisticsUtils } from './statistics.util';

describe('StatisticsUtils', () => {
  describe('calculate_activity_correlations', () => {
    it('should return null when rated days less than 3', () => {
      const days: IRatedDay[] = [
        { date: '2026-01-01', rating: 5, activity_keys: ['a'] },
        { date: '2026-01-02', rating: 6, activity_keys: [] },
      ];

      expect(
        StatisticsUtils.calculate_activity_correlations(days),
      ).toStrictEqual(null);
    });

    it('should compute positive and negative tops', () => {
      const days: IRatedDay[] = [
        {
          date: '2026-01-01',
          rating: 3,
          activity_keys: ['bad'],
        },
        {
          date: '2026-01-02',
          rating: 2,
          activity_keys: ['bad'],
        },
        {
          date: '2026-01-03',
          rating: 8,
          activity_keys: ['good'],
        },
        {
          date: '2026-01-04',
          rating: 9,
          activity_keys: ['good'],
        },
        { date: '2026-01-05', rating: 5, activity_keys: [] },
        { date: '2026-01-06', rating: 6, activity_keys: [] },
      ];

      const result =
        StatisticsUtils.calculate_activity_correlations(days);

      expect(result).not.toBeNull();
      expect(result!.top_negative[0].activity_key).toStrictEqual(
        'bad',
      );
      expect(result!.top_positive[0].activity_key).toStrictEqual(
        'good',
      );
    });

    it('should skip activity without enough with/without days', () => {
      const days: IRatedDay[] = [
        {
          date: '2026-01-01',
          rating: 3,
          activity_keys: ['rare'],
        },
        { date: '2026-01-02', rating: 5, activity_keys: [] },
        { date: '2026-01-03', rating: 6, activity_keys: [] },
      ];

      const result =
        StatisticsUtils.calculate_activity_correlations(days);

      expect(result).not.toBeNull();
      expect(result!.correlations).toStrictEqual([]);
    });
  });
});
