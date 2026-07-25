import { IActivityRecord } from './activity-record.types';

export class ActivityRecord {
  public readonly chat_id: number;
  public readonly date: string;
  public readonly activity_key: string;

  constructor(params: IActivityRecord) {
    this.chat_id = params.chat_id;
    this.date = params.date;
    this.activity_key = params.activity_key;
  }
}
