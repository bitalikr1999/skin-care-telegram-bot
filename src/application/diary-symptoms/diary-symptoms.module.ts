import { Module } from '@nestjs/common';

import { DbLightModule } from '@infra/db-light/db-light.module';
import { ProviderUtils } from '@shared/utils';

import { DIARY_SYMPTOMS_SERVICE } from './ports/diary-symptoms.port';
import { DiarySymptomsService } from './v1/services/diary-symptoms.service';

@Module({
  imports: [DbLightModule],
  providers: [
    ProviderUtils.provide_class(DIARY_SYMPTOMS_SERVICE, DiarySymptomsService),
  ],
  exports: [DIARY_SYMPTOMS_SERVICE],
})
export class DiarySymptomsModule {}
