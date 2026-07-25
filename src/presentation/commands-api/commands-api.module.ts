import { Module } from '@nestjs/common';

import { DbLightModule } from '@infra/db-light/db-light.module';

import { DB_COMMANDS } from './commands';

@Module({
  imports: [DbLightModule],
  providers: [...DB_COMMANDS],
})
export class CommandsApiModule {}
