import { Module } from '@nestjs/common';

import { CommandsApiModule } from '@presentation/commands-api/commands-api.module';

@Module({
  imports: [CommandsApiModule],
})
export class CliModule {}
