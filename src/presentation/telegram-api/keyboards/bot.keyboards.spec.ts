import { Activity } from '@domain/entities/activity/activity.entity';
import { Symptom } from '@domain/entities/symptom/symptom.entity';

import {
  BackKeyboard,
  CatalogKeyboard,
  MenuKeyboard,
  RatingKeyboard,
  SymptomStatsPeriodKeyboard,
} from './bot.keyboards';

describe('MenuKeyboard', () => {
  describe('build', () => {
    it('should include both stats entries', () => {
      const buttons = MenuKeyboard.build().flat();
      const texts = buttons.map((button) => button.text);

      expect(texts).toContain('📈 Оцінка і активності');
      expect(texts).toContain('🔍 Симптоми разом');
    });
  });
});

describe('CatalogKeyboard', () => {
  describe('build_activities', () => {
    it('should mark selected items and add category rows', () => {
      const activities = [
        new Activity({
          key: 'honey',
          label: 'мед',
          category_key: 'food',
          category_label: 'Їжа',
        }),
        new Activity({
          key: 'stress',
          label: 'стрес',
          category_key: 'env',
          category_label: 'Довкілля',
        }),
      ];

      const rows = CatalogKeyboard.build_activities({
        activities,
        selected_keys: ['honey'],
      });

      expect(rows[0][0].text).toStrictEqual('— Їжа —');
      expect(rows[1][0].text).toStrictEqual('✅ мед');
      expect(rows[1][0].callback_data).toStrictEqual(
        'act:toggle:honey',
      );
      expect(rows[rows.length - 1][0].text).toStrictEqual(
        'Готово',
      );
    });
  });

  describe('build_symptoms', () => {
    it('should build symptom toggle buttons', () => {
      const symptoms = [
        new Symptom({
          key: 'itch',
          label: 'свербіж',
          category_key: 'skin',
          category_label: 'Шкіра',
        }),
      ];

      const rows = CatalogKeyboard.build_symptoms({
        symptoms,
        selected_keys: [],
      });

      expect(rows[1][0].callback_data).toStrictEqual(
        'sym:toggle:itch',
      );
    });
  });
});

describe('RatingKeyboard', () => {
  describe('build', () => {
    it('should highlight current rating', () => {
      const rows = RatingKeyboard.build(7);
      const values = rows.slice(0, 2).flat();

      expect(
        values.find((button) => button.text === '[7]'),
      ).toBeDefined();
      expect(
        values.find((button) => button.callback_data === 'rat:set:7'),
      ).toBeDefined();
    });
  });
});

describe('SymptomStatsPeriodKeyboard', () => {
  describe('build', () => {
    it('should expose period callbacks', () => {
      const buttons = SymptomStatsPeriodKeyboard.build()
        .flat()
        .map((button) => button.callback_data);

      expect(buttons).toContain('stats:period:week');
      expect(buttons).toContain('stats:period:all');
    });
  });
});

describe('BackKeyboard', () => {
  describe('build', () => {
    it('should return menu navigation button', () => {
      expect(BackKeyboard.build()).toStrictEqual([
        [{ text: '⬅️ Назад', callback_data: 'nav:menu' }],
      ]);
    });
  });
});
