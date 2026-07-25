import { SymptomRecord } from './symptom-record.entity';
import { ISymptomRecord } from './symptom-record.types';

export class SymptomRecordMapper {
  public static to_entity(data: ISymptomRecord): SymptomRecord {
    return new SymptomRecord(data);
  }

  public static to_raw(value: SymptomRecord): ISymptomRecord {
    return {
      chat_id: value.chat_id,
      date: value.date,
      symptom_key: value.symptom_key,
    };
  }
}
