import { Activity } from './activity.entity';
import { IActivity } from './activity.types';

export class ActivityMapper {
  public static to_entity(data: IActivity): Activity {
    return new Activity(data);
  }

  public static to_raw(value: Activity): IActivity {
    return {
      key: value.key,
      label: value.label,
      category_key: value.category_key,
      category_label: value.category_label,
    };
  }
}
