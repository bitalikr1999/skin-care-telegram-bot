import { Injectable } from '@nestjs/common';

import { ActivityRecord } from '@domain/entities/activity-record/activity-record.entity';
import {
  IAddActivityRecordParams,
  IActivityRecordsRepository,
  IListActivityRecordsByDateParams,
  IRemoveActivityRecordParams,
} from '@domain/repositories';
import { Repository } from '../../abstracts';
import { DbTable } from '../../enums/table.enum';
import { IDbActivityRecord } from '../../interfaces';
import { DbActivityRecordMapper } from '../../mappers/activity-record.mapper';

@Injectable()
export class ActivityRecordsRepository
  extends Repository
  implements IActivityRecordsRepository
{
  public async list_by_date(
    params: IListActivityRecordsByDateParams,
  ): Promise<ActivityRecord[]> {
    const rows = await this.connection
      .from(DbTable.ActivityRecords)
      .where({
        chat_id: params.chat_id,
        date: params.date,
      })
      .select<IDbActivityRecord[]>('*');

    return rows.map(DbActivityRecordMapper.to_entity);
  }

  public async add(
    params: IAddActivityRecordParams,
  ): Promise<ActivityRecord> {
    await this.connection
      .table(DbTable.ActivityRecords)
      .insert({
        chat_id: params.chat_id,
        date: params.date,
        activity_key: params.activity_key,
      })
      .onConflict(['chat_id', 'date', 'activity_key'])
      .ignore();

    return DbActivityRecordMapper.to_entity({
      chat_id: params.chat_id,
      date: params.date,
      activity_key: params.activity_key,
    });
  }

  public async remove(
    params: IRemoveActivityRecordParams,
  ): Promise<void> {
    await this.connection
      .from(DbTable.ActivityRecords)
      .where({
        chat_id: params.chat_id,
        date: params.date,
        activity_key: params.activity_key,
      })
      .delete();
  }

  public async list_all(
    chat_id: number,
  ): Promise<ActivityRecord[]> {
    const rows = await this.connection
      .from(DbTable.ActivityRecords)
      .where({ chat_id })
      .orderBy('date', 'asc')
      .select<IDbActivityRecord[]>('*');

    return rows.map(DbActivityRecordMapper.to_entity);
  }
}
