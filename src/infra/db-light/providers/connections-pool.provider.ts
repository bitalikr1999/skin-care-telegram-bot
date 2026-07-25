import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

import { Provider } from '@nestjs/common';
import knex, { Knex } from 'knex';

import { CONNECTIONS_POOL, MODULE_CONFIG } from '../consts';
import { IModuleConfig } from '../interfaces';

export class ConnectionsPoolProvider {
  public static provide(): Provider {
    return {
      provide: CONNECTIONS_POOL,
      useFactory: this._factory,
      inject: [MODULE_CONFIG],
    };
  }

  private static async _factory(
    config: IModuleConfig,
  ): Promise<Knex> {
    mkdirSync(dirname(config.database_path), { recursive: true });

    const connection = knex({
      client: 'better-sqlite3',
      connection: {
        filename: config.database_path,
      },
      useNullAsDefault: true,
    });

    await connection.raw('SELECT 1');

    return connection;
  }
}
