import { Provider } from '@nestjs/common';
import { Telegraf } from 'telegraf';

import { TELEGRAF_BOT, TELEGRAF_MODULE_CONFIG } from '../consts';
import { ITelegrafModuleConfig } from '../interfaces';

export class TelegrafBotProvider {
  public static provide(): Provider {
    return {
      provide: TELEGRAF_BOT,
      useFactory: this._factory,
      inject: [TELEGRAF_MODULE_CONFIG],
    };
  }

  private static _factory(
    config: ITelegrafModuleConfig,
  ): Telegraf {
    return new Telegraf(config.bot_token);
  }
}
