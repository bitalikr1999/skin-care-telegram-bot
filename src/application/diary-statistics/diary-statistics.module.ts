import { Module } from '@nestjs/common';

import { DbLightModule } from '@infra/db-light/db-light.module';
import { provide_class } from '@shared/utils';

import { DIARY_STATISTICS_SERVICE } from './ports/diary-statistics.port';
import { DiaryStatisticsService } from './v1/services/diary-statistics.service';

@Module({
  imports: [DbLightModule],
  providers: [
    provide_class(
      DIARY_STATISTICS_SERVICE,
      DiaryStatisticsService,
    ),
  ],
  exports: [DIARY_STATISTICS_SERVICE],
})
export class DiaryStatisticsModule {}
