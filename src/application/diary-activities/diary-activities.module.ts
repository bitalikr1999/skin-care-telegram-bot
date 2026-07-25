import { Module } from '@nestjs/common';

import { DbLightModule } from '@infra/db-light/db-light.module';
import { provide_class } from '@shared/utils';

import { DIARY_ACTIVITIES_SERVICE } from './ports/diary-activities.port';
import { DiaryActivitiesService } from './v1/services/diary-activities.service';

@Module({
  imports: [DbLightModule],
  providers: [
    provide_class(
      DIARY_ACTIVITIES_SERVICE,
      DiaryActivitiesService,
    ),
  ],
  exports: [DIARY_ACTIVITIES_SERVICE],
})
export class DiaryActivitiesModule {}
