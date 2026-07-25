import { Inject, Injectable } from '@nestjs/common';

import { DbActionFactory } from '../factories';
import { SeedActivitiesMutation } from '../repositories/activities/mutations';
import { SetupSchemaMutation } from '../repositories/setup/mutations';
import { SeedSymptomsMutation } from '../repositories/symptoms/mutations';

@Injectable()
export class CatalogSeedService {
  constructor(
    @Inject(DbActionFactory)
    private readonly db_action_factory: DbActionFactory,
  ) {}

  public async setup_schema(): Promise<void> {
    await this.db_action_factory
      .create(SetupSchemaMutation)
      .execute();
  }

  public async seed_catalogs(): Promise<void> {
    await this.db_action_factory
      .create(SeedActivitiesMutation)
      .execute();

    await this.db_action_factory
      .create(SeedSymptomsMutation)
      .execute();
  }

  public async setup_and_seed(): Promise<void> {
    await this.setup_schema();
    await this.seed_catalogs();
  }
}
