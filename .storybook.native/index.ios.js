import { AppRegistry, NativeModules } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { loadStories } from './story-loader';
import './addons';
import url from 'url';

configure(loadStories, module);

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const StorybookUI = getStorybookUI({
  port: 7007,
  host: hostname,
});

AppRegistry.registerComponent('storybooknative', () => StorybookUI);
