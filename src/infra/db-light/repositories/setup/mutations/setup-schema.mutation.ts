import { DbAction } from '../../../abstracts';
import { DbTable } from '../../../enums/table.enum';

export class SetupSchemaMutation extends DbAction {
  public async execute(): Promise<void> {
    await this._create_activities();
    await this._create_symptoms();
    await this._create_ratings();
    await this._create_activity_records();
    await this._create_symptom_records();
  }

  private async _create_activities(): Promise<void> {
    const exists = await this._connection.schema.hasTable(
      DbTable.Activities,
    );
    if (exists) {
      return;
    }

    await this._connection.schema.createTable(
      DbTable.Activities,
      (table) => {
        table.text('key').primary();
        table.text('label').notNullable();
        table.text('category_key').notNullable();
        table.text('category_label').notNullable();
      },
    );
  }

  private async _create_symptoms(): Promise<void> {
    const exists = await this._connection.schema.hasTable(
      DbTable.Symptoms,
    );
    if (exists) {
      return;
    }

    await this._connection.schema.createTable(
      DbTable.Symptoms,
      (table) => {
        table.text('key').primary();
        table.text('label').notNullable();
        table.text('category_key').notNullable();
        table.text('category_label').notNullable();
      },
    );
  }

  private async _create_ratings(): Promise<void> {
    const exists = await this._connection.schema.hasTable(
      DbTable.Ratings,
    );
    if (exists) {
      return;
    }

    await this._connection.schema.createTable(
      DbTable.Ratings,
      (table) => {
        table.integer('chat_id').notNullable();
        table.text('date').notNullable();
        table.integer('rating').notNullable();
        table.primary(['chat_id', 'date']);
      },
    );
  }

  private async _create_activity_records(): Promise<void> {
    const exists = await this._connection.schema.hasTable(
      DbTable.ActivityRecords,
    );
    if (exists) {
      return;
    }

    await this._connection.schema.createTable(
      DbTable.ActivityRecords,
      (table) => {
        table.integer('chat_id').notNullable();
        table.text('date').notNullable();
        table.text('activity_key').notNullable();
        table.primary(['chat_id', 'date', 'activity_key']);
        table
          .foreign('activity_key')
          .references('key')
          .inTable(DbTable.Activities);
      },
    );
  }

  private async _create_symptom_records(): Promise<void> {
    const exists = await this._connection.schema.hasTable(
      DbTable.SymptomRecords,
    );
    if (exists) {
      return;
    }

    await this._connection.schema.createTable(
      DbTable.SymptomRecords,
      (table) => {
        table.integer('chat_id').notNullable();
        table.text('date').notNullable();
        table.text('symptom_key').notNullable();
        table.primary(['chat_id', 'date', 'symptom_key']);
        table
          .foreign('symptom_key')
          .references('key')
          .inTable(DbTable.Symptoms);
      },
    );
  }
}
