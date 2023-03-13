module.exports = {
  stories: ['../src/web-components/**/*.stories.mdx', '../src/web-components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
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
