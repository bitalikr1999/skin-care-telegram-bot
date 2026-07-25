import { Module } from '@nestjs/common';

import { DbLightModule } from '@infra/db-light/db-light.module';
import { ProviderUtils } from '@shared/utils';

import { DIARY_EXPORT_SERVICE } from './ports/diary-export.port';
import { DiaryExportService } from './v1/services/diary-export.service';

@Module({
  imports: [DbLightModule],
  providers: [
    ProviderUtils.provide_class(DIARY_EXPORT_SERVICE, DiaryExportService),
  ],
  exports: [DIARY_EXPORT_SERVICE],
})
export class DiaryExportModule {}
