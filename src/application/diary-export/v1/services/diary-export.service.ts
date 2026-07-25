import { Inject, Injectable } from '@nestjs/common';

import {
  ACTIVITIES_REPOSITORY,
  ACTIVITY_RECORDS_REPOSITORY,
  RATINGS_REPOSITORY,
  SYMPTOM_RECORDS_REPOSITORY,
  SYMPTOMS_REPOSITORY,
} from '@domain/consts/repository-tokens.const';
import {
  IActivitiesRepository,
  IActivityRecordsRepository,
  IRatingsRepository,
  ISymptomRecordsRepository,
  ISymptomsRepository,
} from '@domain/repositories';

import {
  IBuildCsvParams,
  ICsvExport,
  IDiaryExportService,
} from '../../ports/diary-export.port';

@Injectable()
export class DiaryExportService implements IDiaryExportService {
  constructor(
    @Inject(RATINGS_REPOSITORY)
    private readonly ratings_repository: IRatingsRepository,
    @Inject(ACTIVITY_RECORDS_REPOSITORY)
    private readonly activity_records_repository: IActivityRecordsRepository,
    @Inject(SYMPTOM_RECORDS_REPOSITORY)
    private readonly symptom_records_repository: ISymptomRecordsRepository,
    @Inject(ACTIVITIES_REPOSITORY)
    private readonly activities_repository: IActivitiesRepository,
    @Inject(SYMPTOMS_REPOSITORY)
    private readonly symptoms_repository: ISymptomsRepository,
  ) {}

  public async build_csv(
    params: IBuildCsvParams,
  ): Promise<ICsvExport> {
    const chat_id = params.chat_id;
    const [
      ratings,
      activity_records,
      symptom_records,
      activities,
      symptoms,
    ] = await Promise.all([
      this.ratings_repository.list_all(chat_id),
      this.activity_records_repository.list_all(chat_id),
      this.symptom_records_repository.list_all(chat_id),
      this.activities_repository.list_all(),
      this.symptoms_repository.list_all(),
    ]);

    const activity_labels = new Map(
      activities.map((item) => [item.key, item.label]),
    );
    const symptom_labels = new Map(
      symptoms.map((item) => [item.key, item.label]),
    );

    const dates = new Set<string>();
    for (const rating of ratings) {
      dates.add(rating.date);
    }
    for (const record of activity_records) {
      dates.add(record.date);
    }
    for (const record of symptom_records) {
      dates.add(record.date);
    }

    const sorted_dates = [...dates].sort();
    const rating_by_date = new Map(
      ratings.map((item) => [item.date, item.rating]),
    );

    const activities_by_date = new Map<string, string[]>();
    for (const record of activity_records) {
      const list = activities_by_date.get(record.date) ?? [];
      list.push(
        activity_labels.get(record.activity_key) ??
          record.activity_key,
      );
      activities_by_date.set(record.date, list);
    }

    const symptoms_by_date = new Map<string, string[]>();
    for (const record of symptom_records) {
      const list = symptoms_by_date.get(record.date) ?? [];
      list.push(
        symptom_labels.get(record.symptom_key) ??
          record.symptom_key,
      );
      symptoms_by_date.set(record.date, list);
    }

    const lines = ['date,rating,activities,symptoms'];
    for (const date of sorted_dates) {
      const rating = rating_by_date.get(date);
      const day_activities = (
        activities_by_date.get(date) ?? []
      ).join('; ');
      const day_symptoms = (
        symptoms_by_date.get(date) ?? []
      ).join('; ');
      lines.push(
        [
          date,
          rating === undefined ? '' : String(rating),
          DiaryExportService._csv_escape(day_activities),
          DiaryExportService._csv_escape(day_symptoms),
        ].join(','),
      );
    }

    return {
      filename: `skin-diary-${chat_id}.csv`,
      content: `${lines.join('\n')}\n`,
    };
  }

  private static _csv_escape(value: string): string {
    if (
      value.includes(',') ||
      value.includes('"') ||
      value.includes('\n')
    ) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
