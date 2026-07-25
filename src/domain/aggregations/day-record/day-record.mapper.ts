import { DayRecord } from './day-record.aggregation';
import { IDayRecord } from './day-record.types';

export class DayRecordMapper {
  public static to_aggregation(data: IDayRecord): DayRecord {
    return new DayRecord(data);
  }

  public static to_raw(value: DayRecord): IDayRecord {
    return {
      chat_id: value.chat_id,
      date: value.date,
      rating: value.rating,
      activity_keys: value.activity_keys,
      symptom_keys: value.symptom_keys,
    };
  }
}
