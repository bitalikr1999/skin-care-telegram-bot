import { Symptom } from './symptom.entity';
import { ISymptom } from './symptom.types';

export class SymptomMapper {
  public static to_entity(data: ISymptom): Symptom {
    return new Symptom(data);
  }

  public static to_raw(value: Symptom): ISymptom {
    return {
      key: value.key,
      label: value.label,
      category_key: value.category_key,
      category_label: value.category_label,
    };
  }
}
