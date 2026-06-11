import type { StorybookConfig } from '@storybook/vue3-vite';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * monorepo 環境でパッケージの絶対パスを解決する
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite') as string,
    options: { docgen: 'vue-component-meta' },
  },
  stories: ['../src/components/**/*.stories.ts'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
    '@storybook/addon-mcp',
  ],
  features: {
    componentsManifest: true,
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      base: configType === 'PRODUCTION' ? '/bm_front_storybook/' : '/',
      plugins: [tailwindcss()],
      resolve: {
        alias: { '@': resolve(__dirname, '../src') },
      },
    });
  },
};

export default config;
