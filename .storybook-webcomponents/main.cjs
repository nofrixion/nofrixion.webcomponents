module.exports = {
  stories: ['../src/web-components/**/*.stories.mdx', '../src/web-components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/web-components',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.optimizeDeps.include = [...(config.optimizeDeps?.include ?? []), '@storybook/web-components'];
    config.optimizeDeps.exclude = [...(config.optimizeDeps?.exclude ?? []), 'lit', 'lit-html'];

    // return the customized config
    return config;
  },
  features: {
    storyStoreV7: true,
  },
};
