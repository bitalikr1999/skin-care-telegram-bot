import { Module } from '@nestjs/common';

import { TelegrafModule } from '@infra/telegraf/telegraf.module';
import { TelegramApiModule } from '@presentation/telegram-api/telegram-api.module';

@Module({
  imports: [
    TelegramApiModule,
    TelegrafModule.for_root({
      imports: [TelegramApiModule],
    }),
  ],
})
export class BotModule {}
