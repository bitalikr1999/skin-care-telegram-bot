import { ACTIVITY_KEYS } from '../seeds/activities.seed';
import { SYMPTOM_KEYS } from '../seeds/symptoms.seed';

export interface IToggleItemParams {
  selected: string[];
  item_key: string;
}

export class CatalogUtils {
  public static is_valid_activity_key(key: string): boolean {
    return ACTIVITY_KEYS.includes(key);
  }

  public static is_valid_symptom_key(key: string): boolean {
    return SYMPTOM_KEYS.includes(key);
  }

  public static toggle_item(
    params: IToggleItemParams,
  ): string[] {
    if (params.selected.includes(params.item_key)) {
      return params.selected.filter(
        (key) => key !== params.item_key,
      );
    }
    return [...params.selected, params.item_key];
  }
}
