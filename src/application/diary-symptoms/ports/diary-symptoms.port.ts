export interface IListSymptomKeysParams {
  chat_id: number;
  date: string;
}

export interface IAddSymptomParams {
  chat_id: number;
  date: string;
  symptom_key: string;
}

export interface IRemoveSymptomParams {
  chat_id: number;
  date: string;
  symptom_key: string;
}

export interface IDiarySymptomsService {
  list_keys(params: IListSymptomKeysParams): Promise<string[]>;
  add(params: IAddSymptomParams): Promise<void>;
  remove(params: IRemoveSymptomParams): Promise<void>;
}

export const DIARY_SYMPTOMS_SERVICE = Symbol(
  'DIARY_SYMPTOMS_SERVICE',
);
