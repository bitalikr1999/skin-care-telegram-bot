import { Provider, Type } from '@nestjs/common';

export class ProviderUtils {
  public static provide_class(
    name: symbol,
    value: unknown,
  ): Provider {
    return {
      provide: name,
      useClass: value as Type<unknown>,
    };
  }
}
