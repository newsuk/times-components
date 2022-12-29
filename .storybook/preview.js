import { addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import { configure } from '@storybook/react';


const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories)\.(tsx|js)$/
);

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Times Components',
    }),
    isFullscreen: false,
    panelPosition: 'right',
    isToolshown: true,
    hierarchySeparator: /\//
  },
});

const loadStories = () => req.keys().filter(k => k.indexOf("brightcove-video") === -1).forEach(filename => req(filename));

configure(loadStories, module);

