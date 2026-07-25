import { DayRecord } from '@domain/aggregations/day-record/day-record.aggregation';

export interface IGetDayParams {
  chat_id: number;
  date: string;
}

export interface IDiaryDayService {
  get(params: IGetDayParams): Promise<DayRecord>;
}

export const DIARY_DAY_SERVICE = Symbol('DIARY_DAY_SERVICE');
