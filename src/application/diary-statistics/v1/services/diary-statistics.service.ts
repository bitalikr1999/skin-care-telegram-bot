import { Inject, Injectable } from '@nestjs/common';

import {
  ACTIVITY_RECORDS_REPOSITORY,
  RATINGS_REPOSITORY,
} from '@domain/consts/repository-tokens.const';
import { IStatisticsResult } from '@domain/interfaces/statistics.interface';
import {
  IActivityRecordsRepository,
  IRatingsRepository,
} from '@domain/repositories';
import { calculate_activity_correlations } from '@domain/utils/statistics.util';

import {
  IDiaryStatisticsService,
  IGetStatisticsParams,
} from '../../ports/diary-statistics.port';

@Injectable()
export class DiaryStatisticsService
  implements IDiaryStatisticsService
{
  constructor(
    @Inject(RATINGS_REPOSITORY)
    private readonly ratings_repository: IRatingsRepository,
    @Inject(ACTIVITY_RECORDS_REPOSITORY)
    private readonly activity_records_repository: IActivityRecordsRepository,
  ) {}

  public async get(
    params: IGetStatisticsParams,
  ): Promise<IStatisticsResult | null> {
    const [ratings, activity_records] = await Promise.all([
      this.ratings_repository.list_all(params.chat_id),
      this.activity_records_repository.list_all(params.chat_id),
    ]);

    const activities_by_date = new Map<string, string[]>();
    for (const record of activity_records) {
      const keys = activities_by_date.get(record.date) ?? [];
      keys.push(record.activity_key);
      activities_by_date.set(record.date, keys);
    }

    const rated_days = ratings.map((rating) => ({
      date: rating.date,
      rating: rating.rating,
      activity_keys: activities_by_date.get(rating.date) ?? [],
    }));

    return calculate_activity_correlations(rated_days);
  }
}
