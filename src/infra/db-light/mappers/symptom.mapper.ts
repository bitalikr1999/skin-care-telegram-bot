import { SymptomMapper } from '@domain/entities/symptom/symptom.mapper';
import { Symptom } from '@domain/entities/symptom/symptom.entity';
import { IDbSymptom } from '../interfaces';

export class DbSymptomMapper {
  public static to_entity(row: IDbSymptom): Symptom {
    return SymptomMapper.to_entity(row);
  }

  public static to_row(value: Symptom): IDbSymptom {
    return SymptomMapper.to_raw(value);
  }
}
