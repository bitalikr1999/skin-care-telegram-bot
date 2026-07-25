import { Injectable } from '@nestjs/common';

import { Activity } from '@domain/entities/activity/activity.entity';
import { IActivitiesRepository } from '@domain/repositories';
import { Repository } from '../../abstracts';
import { DbTable } from '../../enums/table.enum';
import { IDbActivity } from '../../interfaces';
import { DbActivityMapper } from '../../mappers/activity.mapper';

@Injectable()
export class ActivitiesRepository
  extends Repository
  implements IActivitiesRepository
{
  public async list_all(): Promise<Activity[]> {
    const rows = await this.connection
      .from(DbTable.Activities)
      .select<IDbActivity[]>('*');

    return rows.map(DbActivityMapper.to_entity);
  }

  public async get_by_key(key: string): Promise<Activity | null> {
    const row = await this.connection
      .from(DbTable.Activities)
      .where({ key })
      .first<IDbActivity>();

    if (!row) {
      return null;
    }

    return DbActivityMapper.to_entity(row);
  }
}
