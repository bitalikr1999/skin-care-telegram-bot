import { ActivityRecord } from '../entities/activity-record/activity-record.entity';

export interface IListActivityRecordsByDateParams {
  chat_id: number;
  date: string;
}

export interface IAddActivityRecordParams {
  chat_id: number;
  date: string;
  activity_key: string;
}

export interface IRemoveActivityRecordParams {
  chat_id: number;
  date: string;
  activity_key: string;
}

export interface IActivityRecordsRepository {
  list_by_date(
    params: IListActivityRecordsByDateParams,
  ): Promise<ActivityRecord[]>;
  add(params: IAddActivityRecordParams): Promise<ActivityRecord>;
  remove(params: IRemoveActivityRecordParams): Promise<void>;
  list_all(chat_id: number): Promise<ActivityRecord[]>;
}
