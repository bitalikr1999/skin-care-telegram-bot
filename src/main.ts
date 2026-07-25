import 'reflect-metadata';

import { bootstrap_bot } from './bootstrap/bot';
import { bootstrap_cli } from './bootstrap/cli';

const mod = process.env.MOD;

if (mod === 'cli') {
  bootstrap_cli().catch((error) => {
    console.error('Failed to start in cli mode', error);
    process.exit(1);
  });
} else if (mod === 'bot') {
  bootstrap_bot().catch((error) => {
    console.error('Failed to start in bot mode', error);
    process.exit(1);
  });
} else {
  console.error(
    `Unknown MOD="${mod ?? ''}". Use MOD=cli or MOD=bot`,
  );
  process.exit(1);
}
