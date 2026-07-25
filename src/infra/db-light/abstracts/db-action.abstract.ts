import { Knex } from 'knex';

export abstract class DbAction {
  protected _connection!: Knex;

  public set_connection(connection: Knex): this {
    this._connection = connection;
    return this;
  }

  public abstract execute(): Promise<unknown>;
}
