import { Provider } from '@nestjs/common';

import { TELEGRAF_MODULE_CONFIG } from '../consts';
import { ITelegrafModuleConfig } from '../interfaces';

export class TelegrafModuleConfigProvider {
  public static provide(): Provider {
    return {
      provide: TELEGRAF_MODULE_CONFIG,
      useFactory: this._factory,
    };
  }

  private static _factory(): ITelegrafModuleConfig {
    const bot_token = process.env.BOT_TOKEN;
    if (!bot_token) {
      throw new Error('BOT_TOKEN env is required');
    }

    return { bot_token };
  }
}
