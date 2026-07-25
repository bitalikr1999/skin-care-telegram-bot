import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import { DbAction } from '../abstracts/db-action.abstract';
import { CONNECTIONS_POOL } from '../consts';

@Injectable()
export class DbActionFactory {
  constructor(
    @Inject(CONNECTIONS_POOL)
    private readonly connection: Knex,
  ) {}

  public create<T extends DbAction>(action: new () => T): T {
    return new action().set_connection(this.connection);
  }
}
