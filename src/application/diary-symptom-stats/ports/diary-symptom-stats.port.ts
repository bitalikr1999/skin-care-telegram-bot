import { StatsPeriod } from '@domain/consts/stats-period.const';
import { ISymptomCooccurrence } from '@domain/interfaces/symptom-stats.interface';

export interface IGetSymptomStatsParams {
  chat_id: number;
  period: StatsPeriod;
}

export interface IDiarySymptomStatsService {
  get(
    params: IGetSymptomStatsParams,
  ): Promise<ISymptomCooccurrence[] | null>;
}

export const DIARY_SYMPTOM_STATS_SERVICE = Symbol(
  'DIARY_SYMPTOM_STATS_SERVICE',
);
