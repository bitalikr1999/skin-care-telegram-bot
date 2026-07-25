import { RatingValue, RATING_VALUES } from '@domain/consts/rating.const';
import { IBotButton } from '@domain/interfaces/bot-ui.interface';
import { Activity } from '@domain/entities/activity/activity.entity';
import { Symptom } from '@domain/entities/symptom/symptom.entity';

import {
  act_toggle,
  CALLBACK,
  rat_set,
  sym_toggle,
} from '../consts/callback.const';

export class MenuKeyboard {
  public static build(): IBotButton[][] {
    return [
      [
        {
          text: '➕ Додати активності',
          callback_data: CALLBACK.NAV_ACTIVITIES,
        },
      ],
      [
        {
          text: '🩺 Додати самопочуття',
          callback_data: CALLBACK.NAV_SYMPTOMS,
        },
      ],
      [
        {
          text: '📊 Стан шкіри (1–10)',
          callback_data: CALLBACK.NAV_RATING,
        },
      ],
      [
        {
          text: '📋 Сьогоднішній запис',
          callback_data: CALLBACK.NAV_TODAY,
        },
      ],
      [
        {
          text: '📈 Статистика',
          callback_data: CALLBACK.NAV_STATS,
        },
      ],
    ];
  }
}

export class CatalogKeyboard {
  public static build_activities(params: {
    activities: Activity[];
    selected_keys: string[];
  }): IBotButton[][] {
    return CatalogKeyboard._build_catalog({
      items: params.activities,
      selected_keys: params.selected_keys,
      toggle: act_toggle,
      done_callback: CALLBACK.DONE_ACTIVITIES,
    });
  }

  public static build_symptoms(params: {
    symptoms: Symptom[];
    selected_keys: string[];
  }): IBotButton[][] {
    return CatalogKeyboard._build_catalog({
      items: params.symptoms,
      selected_keys: params.selected_keys,
      toggle: sym_toggle,
      done_callback: CALLBACK.DONE_SYMPTOMS,
    });
  }

  private static _build_catalog(params: {
    items: Array<{
      key: string;
      label: string;
      category_key: string;
      category_label: string;
    }>;
    selected_keys: string[];
    toggle: (key: string) => string;
    done_callback: string;
  }): IBotButton[][] {
    const rows: IBotButton[][] = [];
    let last_category = '';

    for (const item of params.items) {
      if (item.category_key !== last_category) {
        last_category = item.category_key;
        rows.push([
          {
            text: `— ${item.category_label} —`,
            callback_data: `noop:${item.category_key}`,
          },
        ]);
      }

      const selected = params.selected_keys.includes(item.key);
      rows.push([
        {
          text: selected ? `✅ ${item.label}` : item.label,
          callback_data: params.toggle(item.key),
        },
      ]);
    }

    rows.push([
      { text: 'Готово', callback_data: params.done_callback },
    ]);
    return rows;
  }
}

export class RatingKeyboard {
  public static build(
    current_rating: RatingValue | null,
  ): IBotButton[][] {
    const row = RATING_VALUES.map((value) => ({
      text:
        current_rating === value ? `[${value}]` : String(value),
      callback_data: rat_set(value),
    }));

    return [
      row.slice(0, 5),
      row.slice(5),
      [{ text: 'Готово', callback_data: CALLBACK.DONE_RATING }],
    ];
  }
}

export class BackKeyboard {
  public static build(): IBotButton[][] {
    return [
      [{ text: '⬅️ Назад', callback_data: CALLBACK.NAV_MENU }],
    ];
  }
}
