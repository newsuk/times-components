module.exports = {
  staticDirs: ['../dist/public','./public'],
  stories: [
    "../packages/**/*.stories.mdx"
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-options",
    "@storybook/addon-viewport",
    "storybook-addon-paddings"
  ],
  framework: '@storybook/react',
};

