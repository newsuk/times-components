import { configure, addDecorator } from "@storybook/react";
import { Text, View } from 'react-native';
import { withInfo, setDefaults } from '@storybook/addon-info';

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories|stories.web)\.js$/
);

setDefaults({
  propTablesExclude: [Text, View]
})

addDecorator((story, context) => withInfo('')(story)(context));

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
