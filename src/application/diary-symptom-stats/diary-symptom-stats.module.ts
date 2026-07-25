import { Module } from '@nestjs/common';

import { DbLightModule } from '@infra/db-light/db-light.module';
import { ProviderUtils } from '@shared/utils';

import { DIARY_SYMPTOM_STATS_SERVICE } from './ports/diary-symptom-stats.port';
import { DiarySymptomStatsService } from './v1/services/diary-symptom-stats.service';

@Module({
  imports: [DbLightModule],
  providers: [
    ProviderUtils.provide_class(
      DIARY_SYMPTOM_STATS_SERVICE,
      DiarySymptomStatsService,
    ),
  ],
  exports: [DIARY_SYMPTOM_STATS_SERVICE],
})
export class DiarySymptomStatsModule {}
