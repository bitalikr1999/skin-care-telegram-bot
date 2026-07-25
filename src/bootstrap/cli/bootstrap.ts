import { Logger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';

import { CliModule } from './cli.module';

export async function bootstrap_cli(): Promise<void> {
  await CommandFactory.run(CliModule, new Logger());
}
