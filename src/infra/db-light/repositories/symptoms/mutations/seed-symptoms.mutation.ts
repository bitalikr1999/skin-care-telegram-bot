import { SYMPTOM_SEEDS } from '@domain/seeds/symptoms.seed';
import { DbAction } from '../../../abstracts';
import { DbTable } from '../../../enums/table.enum';

export class SeedSymptomsMutation extends DbAction {
  public async execute(): Promise<void> {
    const row = await this._connection
      .from(DbTable.Symptoms)
      .count<{ count: number | string }>({ count: '*' })
      .first();

    const count = Number(row?.count ?? 0);
    if (count > 0) {
      return;
    }

    await this._connection
      .table(DbTable.Symptoms)
      .insert(SYMPTOM_SEEDS);
  }
}
