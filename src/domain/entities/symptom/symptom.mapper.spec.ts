import { Symptom } from './symptom.entity';
import { SymptomMapper } from './symptom.mapper';

describe('SymptomMapper', () => {
  const raw = {
    key: 'itch',
    label: 'свербіж',
    category_key: 'skin',
    category_label: 'Шкіра',
  };

  describe('to_entity', () => {
    it('should create Symptom from raw', () => {
      expect(SymptomMapper.to_entity(raw)).toBeInstanceOf(
        Symptom,
      );
    });
  });

  describe('to_raw', () => {
    it('should map Symptom back to raw', () => {
      const entity = SymptomMapper.to_entity(raw);

      expect(SymptomMapper.to_raw(entity)).toStrictEqual(raw);
    });
  });
});
