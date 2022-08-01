import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories)\.(tsx|js)$/
);

addDecorator(withKnobs);
addDecorator(withOptions({
  addonPanelInRight: true,
  name: 'Times Components',
  hierarchySeparator: /\//
}));

const loadStories = () => req.keys().filter(k => k.indexOf("brightcove-video") === -1).forEach(filename => req(filename));

configure(loadStories, module);
