module.exports = {
  stories: [
    '../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-options",
    "@storybook/addon-viewport"
  ],
  framework: '@storybook/react',
};

