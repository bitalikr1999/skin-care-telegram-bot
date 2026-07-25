import { Inject, Injectable } from '@nestjs/common';

import {
  ACTIVITY_RECORDS_REPOSITORY,
  SYMPTOM_RECORDS_REPOSITORY,
} from '@domain/consts/repository-tokens.const';
import {
  IDiaryDaySnapshot,
  ISymptomCooccurrence,
} from '@domain/interfaces/symptom-stats.interface';
import {
  IActivityRecordsRepository,
  ISymptomRecordsRepository,
} from '@domain/repositories';
import { DateUtils } from '@domain/utils/date.util';
import { SymptomStatsUtils } from '@domain/utils/symptom-stats.util';

import {
  IDiarySymptomStatsService,
  IGetSymptomStatsParams,
} from '../../ports/diary-symptom-stats.port';

@Injectable()
export class DiarySymptomStatsService
  implements IDiarySymptomStatsService
{
  constructor(
    @Inject(SYMPTOM_RECORDS_REPOSITORY)
    private readonly symptom_records_repository: ISymptomRecordsRepository,
    @Inject(ACTIVITY_RECORDS_REPOSITORY)
    private readonly activity_records_repository: IActivityRecordsRepository,
  ) {}

  public async get(
    params: IGetSymptomStatsParams,
  ): Promise<ISymptomCooccurrence[] | null> {
    const to_date = DateUtils.today();
    const from_date = DateUtils.period_start(
      params.period,
      to_date,
    );

    const [symptom_records, activity_records] = await Promise.all([
      this.symptom_records_repository.list_all(params.chat_id),
      this.activity_records_repository.list_all(params.chat_id),
    ]);

    const in_range = (date: string): boolean => {
      if (from_date !== null && date < from_date) {
        return false;
      }
      return date <= to_date;
    };

    const days_map = new Map<string, IDiaryDaySnapshot>();

    for (const record of symptom_records) {
      if (!in_range(record.date)) {
        continue;
      }
      const day = days_map.get(record.date) ?? {
        date: record.date,
        activity_keys: [],
        symptom_keys: [],
      };
      day.symptom_keys.push(record.symptom_key);
      days_map.set(record.date, day);
    }

    for (const record of activity_records) {
      if (!in_range(record.date)) {
        continue;
      }
      const day = days_map.get(record.date) ?? {
        date: record.date,
        activity_keys: [],
        symptom_keys: [],
      };
      day.activity_keys.push(record.activity_key);
      days_map.set(record.date, day);
    }

    return SymptomStatsUtils.calculate_cooccurrences([
      ...days_map.values(),
    ]);
  }
}
