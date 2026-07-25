import { ActivityRecord } from './activity-record.entity';
import { ActivityRecordMapper } from './activity-record.mapper';

describe('ActivityRecordMapper', () => {
  const raw = {
    chat_id: 1,
    date: '2026-07-25',
    activity_key: 'honey',
  };

  describe('to_entity', () => {
    it('should create ActivityRecord from raw', () => {
      expect(
        ActivityRecordMapper.to_entity(raw),
      ).toBeInstanceOf(ActivityRecord);
    });
  });

  describe('to_raw', () => {
    it('should map ActivityRecord back to raw', () => {
      const entity = ActivityRecordMapper.to_entity(raw);

      expect(
        ActivityRecordMapper.to_raw(entity),
      ).toStrictEqual(raw);
    });
  });
});
