import { Symptom } from '../entities/symptom/symptom.entity';

export interface ISymptomsRepository {
  list_all(): Promise<Symptom[]>;
  get_by_key(key: string): Promise<Symptom | null>;
}
