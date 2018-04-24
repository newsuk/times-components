import "haul/hot/patch";
import { makeHot, redraw } from "haul/hot";
import url from "url";
import { AppRegistry, NativeModules, Platform } from "react-native";
import {
  getStorybookUI,
  configure,
  addDecorator
} from "@storybook/react-native";
import { withKnobs } from '@storybook/addon-knobs';
import { BarSpacingDecorator, WhiteBgColorDecorator } from "@times-components/storybook";
import { loadStories } from "./story-loader";

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

const renderStorybook = makeHot(() => StorybookUI);

AppRegistry.registerComponent("storybooknative", renderStorybook);

if (module.hot) {
  module.hot.addStatusHandler(status => {
    if (status === "ready") {
      redraw(renderStorybook);
    }
  });
}
