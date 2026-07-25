import { SymptomRecord } from '../entities/symptom-record/symptom-record.entity';

export interface IListSymptomRecordsByDateParams {
  chat_id: number;
  date: string;
}

export interface IAddSymptomRecordParams {
  chat_id: number;
  date: string;
  symptom_key: string;
}

export interface IRemoveSymptomRecordParams {
  chat_id: number;
  date: string;
  symptom_key: string;
}

export interface ISymptomRecordsRepository {
  list_by_date(
    params: IListSymptomRecordsByDateParams,
  ): Promise<SymptomRecord[]>;
  add(params: IAddSymptomRecordParams): Promise<SymptomRecord>;
  remove(params: IRemoveSymptomRecordParams): Promise<void>;
  list_all(chat_id: number): Promise<SymptomRecord[]>;
}
