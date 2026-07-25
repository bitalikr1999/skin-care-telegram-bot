import { Activity } from '@domain/entities/activity/activity.entity';
import { ActivityRecord } from '@domain/entities/activity-record/activity-record.entity';
import { Rating } from '@domain/entities/rating/rating.entity';
import { Symptom } from '@domain/entities/symptom/symptom.entity';
import { SymptomRecord } from '@domain/entities/symptom-record/symptom-record.entity';

import { DbActivityMapper } from './activity.mapper';
import { DbActivityRecordMapper } from './activity-record.mapper';
import { DbRatingMapper } from './rating.mapper';
import { DbSymptomMapper } from './symptom.mapper';
import { DbSymptomRecordMapper } from './symptom-record.mapper';

describe('DbActivityMapper', () => {
  describe('to_entity / to_row', () => {
    it('should round-trip activity row', () => {
      const row = {
        key: 'honey',
        label: 'мед',
        category_key: 'food',
        category_label: 'Їжа',
      };
      const entity = DbActivityMapper.to_entity(row);

      expect(entity).toBeInstanceOf(Activity);
      expect(DbActivityMapper.to_row(entity)).toStrictEqual(row);
    });
  });
});

describe('DbSymptomMapper', () => {
  describe('to_entity / to_row', () => {
    it('should round-trip symptom row', () => {
      const row = {
        key: 'itch',
        label: 'свербіж',
        category_key: 'skin',
        category_label: 'Шкіра',
      };
      const entity = DbSymptomMapper.to_entity(row);

      expect(entity).toBeInstanceOf(Symptom);
      expect(DbSymptomMapper.to_row(entity)).toStrictEqual(row);
    });
  });
});

describe('DbActivityRecordMapper', () => {
  describe('to_entity / to_row', () => {
    it('should round-trip activity record row', () => {
      const row = {
        chat_id: 1,
        date: '2026-07-25',
        activity_key: 'honey',
      };
      const entity = DbActivityRecordMapper.to_entity(row);

      expect(entity).toBeInstanceOf(ActivityRecord);
      expect(
        DbActivityRecordMapper.to_row(entity),
      ).toStrictEqual(row);
    });
  });
});

describe('DbSymptomRecordMapper', () => {
  describe('to_entity / to_row', () => {
    it('should round-trip symptom record row', () => {
      const row = {
        chat_id: 1,
        date: '2026-07-25',
        symptom_key: 'itch',
      };
      const entity = DbSymptomRecordMapper.to_entity(row);

      expect(entity).toBeInstanceOf(SymptomRecord);
      expect(
        DbSymptomRecordMapper.to_row(entity),
      ).toStrictEqual(row);
    });
  });
});

describe('DbRatingMapper', () => {
  describe('to_entity', () => {
    it('should map valid rating row', () => {
      const entity = DbRatingMapper.to_entity({
        chat_id: 1,
        date: '2026-07-25',
        rating: 7,
      });

      expect(entity).toBeInstanceOf(Rating);
      expect(entity.rating).toStrictEqual(7);
    });

    it('should throw when rating is invalid', () => {
      expect(() =>
        DbRatingMapper.to_entity({
          chat_id: 1,
          date: '2026-07-25',
          rating: 99,
        }),
      ).toThrow('Invalid rating in db: 99');
    });
  });

  describe('to_row', () => {
    it('should map entity to row', () => {
      const entity = new Rating({
        chat_id: 1,
        date: '2026-07-25',
        rating: 7,
      });

      expect(DbRatingMapper.to_row(entity)).toStrictEqual({
        chat_id: 1,
        date: '2026-07-25',
        rating: 7,
      });
    });
  });
});
