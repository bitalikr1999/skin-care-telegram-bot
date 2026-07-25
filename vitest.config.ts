import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts'],
  },
  resolve: {
    alias: {
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@application': path.resolve(
        __dirname,
        'src/application',
      ),
      '@infra': path.resolve(__dirname, 'src/infra'),
      '@presentation': path.resolve(
        __dirname,
        'src/presentation',
      ),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@bootstrap': path.resolve(__dirname, 'src/bootstrap'),
    },
  },
});
