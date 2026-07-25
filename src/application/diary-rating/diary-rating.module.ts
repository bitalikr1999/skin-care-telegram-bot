import { Module } from '@nestjs/common';

import { DbLightModule } from '@infra/db-light/db-light.module';
import { provide_class } from '@shared/utils';

import { DIARY_RATING_SERVICE } from './ports/diary-rating.port';
import { DiaryRatingService } from './v1/services/diary-rating.service';

@Module({
  imports: [DbLightModule],
  providers: [
    provide_class(DIARY_RATING_SERVICE, DiaryRatingService),
  ],
  exports: [DIARY_RATING_SERVICE],
})
export class DiaryRatingModule {}
