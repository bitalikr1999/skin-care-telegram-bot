import { DayRecord } from './day-record.aggregation';
import { DayRecordMapper } from './day-record.mapper';

describe('DayRecordMapper', () => {
  const raw = {
    chat_id: 1,
    date: '2026-07-25',
    rating: 7 as const,
    activity_keys: ['honey'],
    symptom_keys: ['itch'],
  };

  describe('to_aggregation', () => {
    it('should create DayRecord from raw', () => {
      const value = DayRecordMapper.to_aggregation(raw);

      expect(value).toBeInstanceOf(DayRecord);
      expect(value.date).toStrictEqual('2026-07-25');
    });
  });

  describe('to_raw', () => {
    it('should map DayRecord back to raw', () => {
      const value = DayRecordMapper.to_aggregation(raw);

      expect(DayRecordMapper.to_raw(value)).toStrictEqual(raw);
    });
  });
});
