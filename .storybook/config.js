import { Text, View } from 'react-native';
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories|stories.web)\.js$/
);

addDecorator(withInfo({
  propTablesExclude: [Text, View]
}));
addDecorator(withKnobs);
addParameters({
  options: {
    theme: create({
      base: 'dark',
      brandTitle: 'Times Components',
    }),
    isFullscreen: false,
    panelPosition: 'right',
    isToolshown: true,
    hierarchyRootSeparator: null,
    hierarchySeparator: /\//
  },
});

const loadStories = () => req.keys().filter(k => k.indexOf("brightcove-video") === -1).forEach(filename => req(filename));

configure(loadStories, module);
