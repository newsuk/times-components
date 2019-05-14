import { AppRegistry } from 'react-native';
import { URL, URLSearchParams } from "url-polyfill";
import StorybookUIRoot from "./storybook"

// see https://github.com/facebook/react-native/issues/16434
global.URL = URL;
global.URLSearchParams = URLSearchParams;

AppRegistry.registerComponent('storybooknative', () => StorybookUIRoot);
