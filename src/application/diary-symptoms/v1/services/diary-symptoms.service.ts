import { Inject, Injectable } from '@nestjs/common';

import { SYMPTOM_RECORDS_REPOSITORY } from '@domain/consts/repository-tokens.const';
import { ISymptomRecordsRepository } from '@domain/repositories';

import {
  IAddSymptomParams,
  IDiarySymptomsService,
  IListSymptomKeysParams,
  IRemoveSymptomParams,
} from '../../ports/diary-symptoms.port';

@Injectable()
export class DiarySymptomsService
  implements IDiarySymptomsService
{
  constructor(
    @Inject(SYMPTOM_RECORDS_REPOSITORY)
    private readonly symptom_records_repository: ISymptomRecordsRepository,
  ) {}

  public async list_keys(
    params: IListSymptomKeysParams,
  ): Promise<string[]> {
    const records =
      await this.symptom_records_repository.list_by_date({
        chat_id: params.chat_id,
        date: params.date,
      });

    return records.map((row) => row.symptom_key);
  }

  public async add(params: IAddSymptomParams): Promise<void> {
    await this.symptom_records_repository.add({
      chat_id: params.chat_id,
      date: params.date,
      symptom_key: params.symptom_key,
    });
  }

  public async remove(
    params: IRemoveSymptomParams,
  ): Promise<void> {
    await this.symptom_records_repository.remove({
      chat_id: params.chat_id,
      date: params.date,
      symptom_key: params.symptom_key,
    });
  }
}
