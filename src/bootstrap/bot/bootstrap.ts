import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { BotModule } from './bot.module';

export async function bootstrap_bot(): Promise<void> {
  const logger = new Logger('BotBootstrap');
  const app = await NestFactory.createApplicationContext(BotModule, {
    logger,
  });

  app.enableShutdownHooks();
  logger.log('Bot application context started');
}
