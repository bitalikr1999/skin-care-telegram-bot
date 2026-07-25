import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Telegraf } from 'telegraf';

import { TELEGRAF_BOT } from '../consts';
import { UpdateDispatcherService } from './update-dispatcher.service';

@Injectable()
export class BotLifecycleService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(BotLifecycleService.name);

  constructor(
    @Inject(TELEGRAF_BOT)
    private readonly bot: Telegraf,
    @Inject(UpdateDispatcherService)
    private readonly update_dispatcher: UpdateDispatcherService,
  ) {}

  public async onModuleInit(): Promise<void> {
    this.update_dispatcher.register();
    await this.bot.launch();
    this.logger.log('Telegraf long polling started');
  }

  public async onModuleDestroy(): Promise<void> {
    this.bot.stop('SIGTERM');
    this.logger.log('Telegraf stopped');
  }
}
