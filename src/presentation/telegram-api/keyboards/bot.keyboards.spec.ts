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

  describe('build_activity_categories', () => {
    it('should list unique categories', () => {
      const rows = CatalogKeyboard.build_activity_categories(
        activities,
      );

      expect(rows[0][0]).toStrictEqual({
        text: 'Їжа',
        callback_data: 'nav:act:cat:food',
      });
      expect(rows[1][0]).toStrictEqual({
        text: 'Довкілля',
        callback_data: 'nav:act:cat:env',
      });
      expect(rows[rows.length - 1][0].callback_data).toStrictEqual(
        'nav:menu',
      );
    });
  });

  describe('build_activity_items', () => {
    it('should mark selected items in a category', () => {
      const rows = CatalogKeyboard.build_activity_items({
        activities,
        selected_keys: ['honey'],
        category_key: 'food',
      });

      expect(rows[0][0].text).toStrictEqual('✅ мед');
      expect(rows[0][0].callback_data).toStrictEqual(
        'act:toggle:honey',
      );
      expect(rows[rows.length - 1].map((b) => b.text)).toStrictEqual(
        ['⬅️ Назад', 'Готово'],
      );
    });
  });

  describe('build_symptom_items', () => {
    it('should build symptom toggle buttons', () => {
      const symptoms = [
        new Symptom({
          key: 'itch',
          label: 'свербіж',
          category_key: 'skin',
          category_label: 'Шкіра',
        }),
      ];

      const rows = CatalogKeyboard.build_symptom_items({
        symptoms,
        selected_keys: [],
        category_key: 'skin',
      });

      expect(rows[0][0].callback_data).toStrictEqual(
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
