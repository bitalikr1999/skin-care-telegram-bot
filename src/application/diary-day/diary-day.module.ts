import { Module } from '@nestjs/common';

import { DbLightModule } from '@infra/db-light/db-light.module';
import { provide_class } from '@shared/utils';

import { DIARY_DAY_SERVICE } from './ports/diary-day.port';
import { DiaryDayService } from './v1/services/diary-day.service';

@Module({
  imports: [DbLightModule],
  providers: [provide_class(DIARY_DAY_SERVICE, DiaryDayService)],
  exports: [DIARY_DAY_SERVICE],
})
export class DiaryDayModule {}
