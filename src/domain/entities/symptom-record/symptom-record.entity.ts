import { ISymptomRecord } from './symptom-record.types';

export class SymptomRecord {
  public readonly chat_id: number;
  public readonly date: string;
  public readonly symptom_key: string;

  constructor(params: ISymptomRecord) {
    this.chat_id = params.chat_id;
    this.date = params.date;
    this.symptom_key = params.symptom_key;
  }
}
