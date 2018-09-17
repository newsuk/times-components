import url from "url";
import { AppRegistry, NativeModules, Platform } from "react-native";
import { URL, URLSearchParams } from "url-polyfill";
import {
  getStorybookUI,
  configure,
  addDecorator
} from "@storybook/react-native";
import { withKnobs } from '@storybook/addon-knobs';
import { BarSpacingDecorator, WhiteBgColorDecorator } from "@times-components/storybook";
import { loadStories } from "./story-loader";

// see https://github.com/facebook/react-native/issues/16434
global.URL = URL;
global.URLSearchParams = URLSearchParams;

if (Platform.OS === "ios") {
  addDecorator(BarSpacingDecorator);
}

if (Platform.OS === "android") {
  addDecorator(WhiteBgColorDecorator);
}

addDecorator(withKnobs);

configure(loadStories, module);

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const StorybookUI = getStorybookUI({
  port: 7007,
  host: hostname
});

AppRegistry.registerComponent("storybooknative", () => StorybookUI);
