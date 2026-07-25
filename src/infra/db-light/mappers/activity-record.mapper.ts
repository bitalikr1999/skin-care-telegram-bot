import { ActivityRecordMapper } from '@domain/entities/activity-record/activity-record.mapper';
import { ActivityRecord } from '@domain/entities/activity-record/activity-record.entity';
import { IDbActivityRecord } from '../interfaces';

export class DbActivityRecordMapper {
  public static to_entity(row: IDbActivityRecord): ActivityRecord {
    return ActivityRecordMapper.to_entity(row);
  }

  public static to_row(value: ActivityRecord): IDbActivityRecord {
    return ActivityRecordMapper.to_raw(value);
  }
}
