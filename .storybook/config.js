import { Text, View } from 'react-native';
import { configure, addDecorator } from "@storybook/react";
import { withInfo, setDefaults } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs/react';
import { checkA11y } from '@storybook/addon-a11y';

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories|stories.web)\.js$/
);

setDefaults({
  propTablesExclude: [Text, View]
})

setOptions({
  name: 'Times Components',
  hierarchySeparator: /\//
});


addDecorator((story, context) => withInfo('')(story)(context));
addDecorator(checkA11y);
addDecorator(withKnobs);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
