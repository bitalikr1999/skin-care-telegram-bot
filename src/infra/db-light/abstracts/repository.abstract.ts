import { Inject } from '@nestjs/common';
import { Knex } from 'knex';

import { CONNECTIONS_POOL } from '../consts';
import { DbActionFactory } from '../factories';

import { DbAction } from './db-action.abstract';

export abstract class Repository {
  constructor(
    @Inject(CONNECTIONS_POOL)
    protected readonly connection: Knex,
    @Inject(DbActionFactory)
    protected readonly db_action_factory: DbActionFactory,
  ) {}

  protected create_action<T extends DbAction>(
    action: new () => T,
  ): T {
    return this.db_action_factory.create(action);
  }
}
