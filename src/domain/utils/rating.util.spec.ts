import { RatingUtils } from './rating.util';

describe('RatingUtils', () => {
  describe('is_valid', () => {
    it('should return true when value is in 1..10', () => {
      expect(RatingUtils.is_valid(1)).toStrictEqual(true);
      expect(RatingUtils.is_valid(10)).toStrictEqual(true);
    });

    it('should return false when value is out of range', () => {
      expect(RatingUtils.is_valid(0)).toStrictEqual(false);
      expect(RatingUtils.is_valid(11)).toStrictEqual(false);
    });

    it('should return false when value is not integer', () => {
      expect(RatingUtils.is_valid(5.5)).toStrictEqual(false);
    });
  });
});
