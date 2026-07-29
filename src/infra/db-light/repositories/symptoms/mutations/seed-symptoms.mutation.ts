import { SYMPTOM_KEYS, SYMPTOM_SEEDS } from '@domain/seeds/symptoms.seed';
import { DbAction } from '../../../abstracts';
import { DbTable } from '../../../enums/table.enum';

export class SeedSymptomsMutation extends DbAction {
  public async execute(): Promise<void> {
    await this._connection
      .table(DbTable.Symptoms)
      .insert(SYMPTOM_SEEDS)
      .onConflict('key')
      .merge(['label', 'category_key', 'category_label']);

    const used_rows = await this._connection
      .table(DbTable.SymptomRecords)
      .distinct('symptom_key');
    const used_keys = new Set(
      used_rows.map(
        (row: { symptom_key: string }) => row.symptom_key,
      ),
    );
    const removable = (
      await this._connection
        .table(DbTable.Symptoms)
        .select('key')
        .whereNotIn('key', SYMPTOM_KEYS)
    )
      .map((row: { key: string }) => row.key)
      .filter((key) => !used_keys.has(key));

    if (removable.length > 0) {
      await this._connection
        .table(DbTable.Symptoms)
        .whereIn('key', removable)
        .del();
    }
  }
}
