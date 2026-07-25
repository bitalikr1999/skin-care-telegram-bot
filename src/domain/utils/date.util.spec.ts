import { DateUtils } from './date.util';

describe('DateUtils', () => {
  describe('today', () => {
    it('should return YYYY-MM-DD', () => {
      expect(DateUtils.today()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('shift', () => {
    it('should shift date by days', () => {
      expect(DateUtils.shift('2026-07-25', -6)).toStrictEqual(
        '2026-07-19',
      );
    });

    it('should cross month boundary', () => {
      expect(DateUtils.shift('2026-03-01', -1)).toStrictEqual(
        '2026-02-28',
      );
    });
  });

  describe('period_start', () => {
    it('should return start for week', () => {
      expect(
        DateUtils.period_start('week', '2026-07-25'),
      ).toStrictEqual('2026-07-19');
    });

    it('should return start for month', () => {
      expect(
        DateUtils.period_start('month', '2026-07-25'),
      ).toStrictEqual('2026-06-26');
    });

    it('should return start for quarter', () => {
      expect(
        DateUtils.period_start('quarter', '2026-07-25'),
      ).toStrictEqual('2026-04-27');
    });

    it('should return null for all', () => {
      expect(
        DateUtils.period_start('all', '2026-07-25'),
      ).toStrictEqual(null);
    });
  });
});
