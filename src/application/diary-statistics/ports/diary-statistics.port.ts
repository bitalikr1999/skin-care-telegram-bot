import { IStatisticsResult } from '@domain/interfaces/statistics.interface';

export interface IGetStatisticsParams {
  chat_id: number;
}

export interface IDiaryStatisticsService {
  get(
    params: IGetStatisticsParams,
  ): Promise<IStatisticsResult | null>;
}

export const DIARY_STATISTICS_SERVICE = Symbol(
  'DIARY_STATISTICS_SERVICE',
);
