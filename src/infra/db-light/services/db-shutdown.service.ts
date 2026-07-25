import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Knex } from 'knex';

import { CONNECTIONS_POOL } from '../consts';

@Injectable()
export class DbShutdownService implements OnModuleDestroy {
  constructor(
    @Inject(CONNECTIONS_POOL)
    private readonly connections_pool: Knex,
  ) {}

  public async onModuleDestroy(): Promise<void> {
    await this.connections_pool.destroy();
  }
}
