import { ACTIVITY_KEYS, ACTIVITY_SEEDS } from '@domain/seeds/activities.seed';
import { DbAction } from '../../../abstracts';
import { DbTable } from '../../../enums/table.enum';

export class SeedActivitiesMutation extends DbAction {
  public async execute(): Promise<void> {
    await this._connection
      .table(DbTable.Activities)
      .insert(ACTIVITY_SEEDS)
      .onConflict('key')
      .merge(['label', 'category_key', 'category_label']);

    const used_rows = await this._connection
      .table(DbTable.ActivityRecords)
      .distinct('activity_key');
    const used_keys = new Set(
      used_rows.map(
        (row: { activity_key: string }) => row.activity_key,
      ),
    );
    const removable = (
      await this._connection
        .table(DbTable.Activities)
        .select('key')
        .whereNotIn('key', ACTIVITY_KEYS)
    )
      .map((row: { key: string }) => row.key)
      .filter((key) => !used_keys.has(key));

    if (removable.length > 0) {
      await this._connection
        .table(DbTable.Activities)
        .whereIn('key', removable)
        .del();
    }
  }
}
