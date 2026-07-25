import { Provider, Type } from '@nestjs/common';

export const provide_class = (
  name: symbol,
  value: unknown,
): Provider => ({
  provide: name,
  useClass: value as Type<unknown>,
});
