import { Injectable } from '@nestjs/common';

import { SymptomRecord } from '@domain/entities/symptom-record/symptom-record.entity';
import {
  IAddSymptomRecordParams,
  IListSymptomRecordsByDateParams,
  IRemoveSymptomRecordParams,
  ISymptomRecordsRepository,
} from '@domain/repositories';
import { Repository } from '../../abstracts';
import { DbTable } from '../../enums/table.enum';
import { IDbSymptomRecord } from '../../interfaces';
import { DbSymptomRecordMapper } from '../../mappers/symptom-record.mapper';

@Injectable()
export class SymptomRecordsRepository
  extends Repository
  implements ISymptomRecordsRepository
{
  public async list_by_date(
    params: IListSymptomRecordsByDateParams,
  ): Promise<SymptomRecord[]> {
    const rows = await this.connection
      .from(DbTable.SymptomRecords)
      .where({
        chat_id: params.chat_id,
        date: params.date,
      })
      .select<IDbSymptomRecord[]>('*');

    return rows.map(DbSymptomRecordMapper.to_entity);
  }

  public async add(
    params: IAddSymptomRecordParams,
  ): Promise<SymptomRecord> {
    await this.connection
      .table(DbTable.SymptomRecords)
      .insert({
        chat_id: params.chat_id,
        date: params.date,
        symptom_key: params.symptom_key,
      })
      .onConflict(['chat_id', 'date', 'symptom_key'])
      .ignore();

    return DbSymptomRecordMapper.to_entity({
      chat_id: params.chat_id,
      date: params.date,
      symptom_key: params.symptom_key,
    });
  }

  public async remove(
    params: IRemoveSymptomRecordParams,
  ): Promise<void> {
    await this.connection
      .from(DbTable.SymptomRecords)
      .where({
        chat_id: params.chat_id,
        date: params.date,
        symptom_key: params.symptom_key,
      })
      .delete();
  }

  public async list_all(
    chat_id: number,
  ): Promise<SymptomRecord[]> {
    const rows = await this.connection
      .from(DbTable.SymptomRecords)
      .where({ chat_id })
      .orderBy('date', 'asc')
      .select<IDbSymptomRecord[]>('*');

    return rows.map(DbSymptomRecordMapper.to_entity);
  }
}
