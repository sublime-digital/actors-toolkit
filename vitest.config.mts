import { defineConfig } from 'vitest/config';
import * as analog from '@analogjs/vitest-angular';

// Handle whether vitestBuilder / default is a function or already a Vite plugin object/array
const getPlugins = () => {
  const target = (analog as any).vitestBuilder || (analog as any).default || analog;
  if (typeof target === 'function') {
    return target({ tsconfig: './tsconfig.spec.json', jit: true });
  }
  return target;
};

export default defineConfig({
  plugins: [getPlugins()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    server: {
      deps: {
        inline: [/@angular/, /@analogjs/],
      },
    },
  },
});
