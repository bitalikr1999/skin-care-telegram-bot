import { Inject, Injectable } from '@nestjs/common';

import { DayRecord } from '@domain/aggregations/day-record/day-record.aggregation';
import {
  ACTIVITY_RECORDS_REPOSITORY,
  RATINGS_REPOSITORY,
  SYMPTOM_RECORDS_REPOSITORY,
} from '@domain/consts/repository-tokens.const';
import {
  IActivityRecordsRepository,
  IRatingsRepository,
  ISymptomRecordsRepository,
} from '@domain/repositories';

import {
  IDiaryDayService,
  IGetDayParams,
} from '../../ports/diary-day.port';

@Injectable()
export class DiaryDayService implements IDiaryDayService {
  constructor(
    @Inject(RATINGS_REPOSITORY)
    private readonly ratings_repository: IRatingsRepository,
    @Inject(ACTIVITY_RECORDS_REPOSITORY)
    private readonly activity_records_repository: IActivityRecordsRepository,
    @Inject(SYMPTOM_RECORDS_REPOSITORY)
    private readonly symptom_records_repository: ISymptomRecordsRepository,
  ) {}

  public async get(params: IGetDayParams): Promise<DayRecord> {
    const [rating, activity_records, symptom_records] =
      await Promise.all([
        this.ratings_repository.get_by_date({
          chat_id: params.chat_id,
          date: params.date,
        }),
        this.activity_records_repository.list_by_date({
          chat_id: params.chat_id,
          date: params.date,
        }),
        this.symptom_records_repository.list_by_date({
          chat_id: params.chat_id,
          date: params.date,
        }),
      ]);

    return new DayRecord({
      chat_id: params.chat_id,
      date: params.date,
      rating: rating?.rating ?? null,
      activity_keys: activity_records.map(
        (row) => row.activity_key,
      ),
      symptom_keys: symptom_records.map((row) => row.symptom_key),
    });
  }
}
