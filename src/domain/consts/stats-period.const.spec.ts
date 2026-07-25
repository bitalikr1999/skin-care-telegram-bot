import { StatsPeriodUtils } from '../consts/stats-period.const';

describe('StatsPeriodUtils', () => {
  describe('is', () => {
    it('should return true when period is known', () => {
      expect(StatsPeriodUtils.is('week')).toStrictEqual(true);
      expect(StatsPeriodUtils.is('all')).toStrictEqual(true);
    });

    it('should return false when period is unknown', () => {
      expect(StatsPeriodUtils.is('year')).toStrictEqual(false);
    });
  });
});
