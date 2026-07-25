import { SymptomRecord } from './symptom-record.entity';
import { SymptomRecordMapper } from './symptom-record.mapper';

describe('SymptomRecordMapper', () => {
  const raw = {
    chat_id: 1,
    date: '2026-07-25',
    symptom_key: 'itch',
  };

  describe('to_entity', () => {
    it('should create SymptomRecord from raw', () => {
      expect(
        SymptomRecordMapper.to_entity(raw),
      ).toBeInstanceOf(SymptomRecord);
    });
  });

  describe('to_raw', () => {
    it('should map SymptomRecord back to raw', () => {
      const entity = SymptomRecordMapper.to_entity(raw);

      expect(SymptomRecordMapper.to_raw(entity)).toStrictEqual(
        raw,
      );
    });
  });
});
