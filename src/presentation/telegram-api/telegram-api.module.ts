import { Module } from '@nestjs/common';

import { BOT_UPDATE_HANDLER } from '@domain/consts/bot-tokens.const';
import { DiaryActivitiesModule } from '@application/diary-activities/diary-activities.module';
import { DiaryDayModule } from '@application/diary-day/diary-day.module';
import { DiaryExportModule } from '@application/diary-export/diary-export.module';
import { DiaryRatingModule } from '@application/diary-rating/diary-rating.module';
import { DiaryStatisticsModule } from '@application/diary-statistics/diary-statistics.module';
import { DiarySymptomsModule } from '@application/diary-symptoms/diary-symptoms.module';
import { DbLightModule } from '@infra/db-light/db-light.module';
import { provide_class } from '@shared/utils';

import { BotUpdateHandler } from './handlers/bot-update.handler';

@Module({
  imports: [
    DbLightModule,
    DiaryActivitiesModule,
    DiarySymptomsModule,
    DiaryRatingModule,
    DiaryDayModule,
    DiaryStatisticsModule,
    DiaryExportModule,
  ],
  providers: [
    provide_class(BOT_UPDATE_HANDLER, BotUpdateHandler),
  ],
  exports: [BOT_UPDATE_HANDLER],
})
export class TelegramApiModule {}
