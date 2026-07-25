import { Inject, Injectable } from '@nestjs/common';

import { ACTIVITY_RECORDS_REPOSITORY } from '@domain/consts/repository-tokens.const';
import { IActivityRecordsRepository } from '@domain/repositories';

import {
  IAddActivityParams,
  IDiaryActivitiesService,
  IListActivityKeysParams,
  IRemoveActivityParams,
} from '../../ports/diary-activities.port';

@Injectable()
export class DiaryActivitiesService
  implements IDiaryActivitiesService
{
  constructor(
    @Inject(ACTIVITY_RECORDS_REPOSITORY)
    private readonly activity_records_repository: IActivityRecordsRepository,
  ) {}

  public async list_keys(
    params: IListActivityKeysParams,
  ): Promise<string[]> {
    const records =
      await this.activity_records_repository.list_by_date({
        chat_id: params.chat_id,
        date: params.date,
      });

    return records.map((row) => row.activity_key);
  }

  public async add(params: IAddActivityParams): Promise<void> {
    await this.activity_records_repository.add({
      chat_id: params.chat_id,
      date: params.date,
      activity_key: params.activity_key,
    });
  }

  public async remove(
    params: IRemoveActivityParams,
  ): Promise<void> {
    await this.activity_records_repository.remove({
      chat_id: params.chat_id,
      date: params.date,
      activity_key: params.activity_key,
    });
  }
}
