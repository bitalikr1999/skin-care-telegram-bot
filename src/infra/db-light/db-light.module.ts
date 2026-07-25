import { Module } from '@nestjs/common';

import {
  ACTIVITIES_REPOSITORY,
  ACTIVITY_RECORDS_REPOSITORY,
  RATINGS_REPOSITORY,
  SYMPTOM_RECORDS_REPOSITORY,
  SYMPTOMS_REPOSITORY,
} from '@domain/consts/repository-tokens.const';
import { provide_class } from '@shared/utils';

import { DbActionFactory } from './factories';
import {
  ConnectionsPoolProvider,
  ModuleConfigProvider,
} from './providers';
import { ActivitiesRepository } from './repositories/activities/activities.repository';
import { ActivityRecordsRepository } from './repositories/activity-records/activity-records.repository';
import { RatingsRepository } from './repositories/ratings/ratings.repository';
import { SymptomRecordsRepository } from './repositories/symptom-records/symptom-records.repository';
import { SymptomsRepository } from './repositories/symptoms/symptoms.repository';
import {
  CatalogSeedService,
  DbShutdownService,
} from './services';

@Module({
  providers: [
    ModuleConfigProvider.provide(),
    ConnectionsPoolProvider.provide(),
    DbActionFactory,
    provide_class(ACTIVITIES_REPOSITORY, ActivitiesRepository),
    provide_class(SYMPTOMS_REPOSITORY, SymptomsRepository),
    provide_class(RATINGS_REPOSITORY, RatingsRepository),
    provide_class(
      ACTIVITY_RECORDS_REPOSITORY,
      ActivityRecordsRepository,
    ),
    provide_class(
      SYMPTOM_RECORDS_REPOSITORY,
      SymptomRecordsRepository,
    ),
    CatalogSeedService,
    DbShutdownService,
  ],
  exports: [
    ACTIVITIES_REPOSITORY,
    SYMPTOMS_REPOSITORY,
    RATINGS_REPOSITORY,
    ACTIVITY_RECORDS_REPOSITORY,
    SYMPTOM_RECORDS_REPOSITORY,
    CatalogSeedService,
  ],
})
export class DbLightModule {}
