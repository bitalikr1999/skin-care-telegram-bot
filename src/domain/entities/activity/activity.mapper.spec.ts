import { Activity } from './activity.entity';
import { ActivityMapper } from './activity.mapper';

describe('ActivityMapper', () => {
  const raw = {
    key: 'honey',
    label: 'мед',
    category_key: 'food',
    category_label: 'Їжа',
  };

  describe('to_entity', () => {
    it('should create Activity from raw', () => {
      expect(ActivityMapper.to_entity(raw)).toBeInstanceOf(
        Activity,
      );
    });
  });

  describe('to_raw', () => {
    it('should map Activity back to raw', () => {
      const entity = ActivityMapper.to_entity(raw);

      expect(ActivityMapper.to_raw(entity)).toStrictEqual(raw);
    });
  });
});
