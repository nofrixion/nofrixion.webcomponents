const isPreBuild = process.env.PRE_BUILD === 'true';

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-obfuscator': {
      enable: isPreBuild,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      keepData: false,
    },
  },
};
