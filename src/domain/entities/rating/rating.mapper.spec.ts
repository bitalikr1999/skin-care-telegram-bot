import { Rating } from './rating.entity';
import { RatingMapper } from './rating.mapper';

describe('RatingMapper', () => {
  const raw = {
    chat_id: 1,
    date: '2026-07-25',
    rating: 8 as const,
  };

  describe('to_entity', () => {
    it('should create Rating from raw', () => {
      expect(RatingMapper.to_entity(raw)).toBeInstanceOf(Rating);
    });
  });

  describe('to_raw', () => {
    it('should map Rating back to raw', () => {
      const entity = RatingMapper.to_entity(raw);

      expect(RatingMapper.to_raw(entity)).toStrictEqual(raw);
    });
  });
});
