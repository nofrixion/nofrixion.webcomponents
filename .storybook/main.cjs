module.exports = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config, _) => {
    // We need to remove the plugin that injects CSS into the JS
    // because it's causing to remove the fonts from the assets
    // when the storybook is built.
    config.plugins = config.plugins?.filter((plugin) => plugin?.['name'] !== 'vite-plugin-css-injected-by-js');

    return config;
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: false,
  },
};
