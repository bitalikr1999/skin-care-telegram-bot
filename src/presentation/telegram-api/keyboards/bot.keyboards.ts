import { RatingValue, RATING_VALUES } from '@domain/consts/rating.const';
import { Activity } from '@domain/entities/activity/activity.entity';
import { Symptom } from '@domain/entities/symptom/symptom.entity';
import { IBotButton } from '@domain/interfaces/bot-ui.interface';
import { CatalogGroupUtils } from '@domain/utils/catalog-group.util';

import {
  CALLBACK,
  CallbackData,
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
          text: '📈 Оцінка і активності',
          callback_data: CALLBACK.NAV_STATS_RATING,
        },
      ],
      [
        {
          text: '🔍 Симптоми разом',
          callback_data: CALLBACK.NAV_STATS_SYMPTOMS,
        },
      ],
    ];
  }
}

export class CatalogKeyboard {
  public static build_activity_categories(
    activities: Activity[],
  ): IBotButton[][] {
    return CatalogKeyboard._build_categories({
      items: activities,
      open_category: CallbackData.act_category,
      back_callback: CALLBACK.NAV_MENU,
    });
  }

  public static build_activity_items(params: {
    activities: Activity[];
    selected_keys: string[];
    category_key: string;
  }): IBotButton[][] {
    return CatalogKeyboard._build_items({
      items: params.activities,
      selected_keys: params.selected_keys,
      category_key: params.category_key,
      toggle: CallbackData.act_toggle,
      back_callback: CALLBACK.NAV_ACTIVITIES,
      done_callback: CALLBACK.DONE_ACTIVITIES,
    });
  }

  public static build_symptom_categories(
    symptoms: Symptom[],
  ): IBotButton[][] {
    return CatalogKeyboard._build_categories({
      items: symptoms,
      open_category: CallbackData.sym_category,
      back_callback: CALLBACK.NAV_MENU,
    });
  }

  public static build_symptom_items(params: {
    symptoms: Symptom[];
    selected_keys: string[];
    category_key: string;
  }): IBotButton[][] {
    return CatalogKeyboard._build_items({
      items: params.symptoms,
      selected_keys: params.selected_keys,
      category_key: params.category_key,
      toggle: CallbackData.sym_toggle,
      back_callback: CALLBACK.NAV_SYMPTOMS,
      done_callback: CALLBACK.DONE_SYMPTOMS,
    });
  }

  private static _build_categories(params: {
    items: Array<{
      category_key: string;
      category_label: string;
    }>;
    open_category: (category_key: string) => string;
    back_callback: string;
  }): IBotButton[][] {
    const rows = CatalogGroupUtils.categories(params.items).map(
      (category) => [
        {
          text: category.label,
          callback_data: params.open_category(category.key),
        },
      ],
    );

    rows.push([
      { text: '⬅️ Назад', callback_data: params.back_callback },
    ]);
    return rows;
  }

  private static _build_items(params: {
    items: Array<{
      key: string;
      label: string;
      category_key: string;
    }>;
    selected_keys: string[];
    category_key: string;
    toggle: (key: string) => string;
    back_callback: string;
    done_callback: string;
  }): IBotButton[][] {
    const items = CatalogGroupUtils.filter_items({
      items: params.items,
      category_key: params.category_key,
    });

    const rows: IBotButton[][] = items.map((item) => {
      const selected = params.selected_keys.includes(item.key);
      return [
        {
          text: selected ? `✅ ${item.label}` : item.label,
          callback_data: params.toggle(item.key),
        },
      ];
    });

    rows.push([
      { text: '⬅️ Назад', callback_data: params.back_callback },
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
      callback_data: CallbackData.rat_set(value),
    }));

    return [
      row.slice(0, 5),
      row.slice(5),
      [{ text: 'Готово', callback_data: CALLBACK.DONE_RATING }],
    ];
  }
}

export class SymptomStatsPeriodKeyboard {
  public static build(): IBotButton[][] {
    return [
      [
        {
          text: 'Тиждень',
          callback_data: CallbackData.stats_period('week'),
        },
        {
          text: 'Місяць',
          callback_data: CallbackData.stats_period('month'),
        },
      ],
      [
        {
          text: '3 місяці',
          callback_data: CallbackData.stats_period('quarter'),
        },
        {
          text: 'Загальна',
          callback_data: CallbackData.stats_period('all'),
        },
      ],
      [{ text: '⬅️ Назад', callback_data: CALLBACK.NAV_MENU }],
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
