import { RatingValue } from '../../consts/rating.const';

import { IDayRecord } from './day-record.types';

export class DayRecord {
  public readonly chat_id: number;
  public readonly date: string;
  public readonly rating: RatingValue | null;
  public readonly activity_keys: string[];
  public readonly symptom_keys: string[];

  constructor(params: IDayRecord) {
    this.chat_id = params.chat_id;
    this.date = params.date;
    this.rating = params.rating;
    this.activity_keys = params.activity_keys;
    this.symptom_keys = params.symptom_keys;
  }
}
