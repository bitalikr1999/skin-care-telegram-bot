import { Provider } from '@nestjs/common';

import { MODULE_CONFIG } from '../consts';
import { IModuleConfig } from '../interfaces';

const DEFAULT_DATABASE_PATH = './data/skin-diary.sqlite';

export class ModuleConfigProvider {
  public static provide(): Provider {
    return {
      provide: MODULE_CONFIG,
      useFactory: this._factory,
    };
  }

  private static _factory(): IModuleConfig {
    return {
      database_path:
        process.env.SQLITE_PATH ?? DEFAULT_DATABASE_PATH,
    };
  }
}
