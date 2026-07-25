import { SymptomRecordMapper } from '@domain/entities/symptom-record/symptom-record.mapper';
import { SymptomRecord } from '@domain/entities/symptom-record/symptom-record.entity';
import { IDbSymptomRecord } from '../interfaces';

export class DbSymptomRecordMapper {
  public static to_entity(row: IDbSymptomRecord): SymptomRecord {
    return SymptomRecordMapper.to_entity(row);
  }

  public static to_row(value: SymptomRecord): IDbSymptomRecord {
    return SymptomRecordMapper.to_raw(value);
  }
}
