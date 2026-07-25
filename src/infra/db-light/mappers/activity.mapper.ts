import { ActivityMapper } from '@domain/entities/activity/activity.mapper';
import { Activity } from '@domain/entities/activity/activity.entity';
import { IDbActivity } from '../interfaces';

export class DbActivityMapper {
  public static to_entity(row: IDbActivity): Activity {
    return ActivityMapper.to_entity(row);
  }

  public static to_row(value: Activity): IDbActivity {
    return ActivityMapper.to_raw(value);
  }
}
