import { ACTIVITY_SEEDS } from '@domain/seeds/activities.seed';
import { DbAction } from '../../../abstracts';
import { DbTable } from '../../../enums/table.enum';

export class SeedActivitiesMutation extends DbAction {
  public async execute(): Promise<void> {
    const row = await this._connection
      .from(DbTable.Activities)
      .count<{ count: number | string }>({ count: '*' })
      .first();

    const count = Number(row?.count ?? 0);
    if (count > 0) {
      return;
    }

    await this._connection
      .table(DbTable.Activities)
      .insert(ACTIVITY_SEEDS);
  }
}
