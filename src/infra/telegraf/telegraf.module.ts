import { DynamicModule, Module, Type } from '@nestjs/common';

import {
  TelegrafBotProvider,
  TelegrafModuleConfigProvider,
} from './providers';
import {
  BotLifecycleService,
  UpdateDispatcherService,
} from './services';

export interface ITelegrafModuleOptions {
  imports: Type[];
}

@Module({})
export class TelegrafModule {
  public static for_root(
    options: ITelegrafModuleOptions,
  ): DynamicModule {
    return {
      module: TelegrafModule,
      imports: options.imports,
      providers: [
        TelegrafModuleConfigProvider.provide(),
        TelegrafBotProvider.provide(),
        UpdateDispatcherService,
        BotLifecycleService,
      ],
    };
  }
}
