import { ActivityRecord } from './activity-record.entity';
import { IActivityRecord } from './activity-record.types';

export class ActivityRecordMapper {
  public static to_entity(data: IActivityRecord): ActivityRecord {
    return new ActivityRecord(data);
  }

  public static to_raw(value: ActivityRecord): IActivityRecord {
    return {
      chat_id: value.chat_id,
      date: value.date,
      activity_key: value.activity_key,
    };
  }
}
