import { Inject, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { CatalogSeedService } from '@infra/db-light/services';

@Command({
  name: 'seed',
  description:
    'Create DB schema (if needed) and seed activity/symptom catalogs once',
})
export class SeedCommand extends CommandRunner {
  constructor(
    @Inject(CatalogSeedService)
    private readonly catalog_seed_service: CatalogSeedService,
  ) {
    super();
  }

  public async run(): Promise<void> {
    const logger = new Logger(SeedCommand.name);

    logger.log('Starting catalog seed');

    try {
      await this.catalog_seed_service.setup_and_seed();
      logger.log('Catalog seed finished');
    } catch (error) {
      logger.error('Catalog seed failed', error as Error);
      throw error;
    }
  }
}
