import url from "url";
import { AppRegistry, NativeModules, Platform } from "react-native";
import {
  getStorybookUI,
  configure,
  addDecorator
} from "@storybook/react-native";
import { BarSpacingDecorator } from "@times-components/storybook/decorators";
import { WhiteBgColorDecorator } from "@times-components/storybook/decorators";
import { loadStories } from "./story-loader";
import "./addons";

if (Platform.OS === "ios") {
  addDecorator(BarSpacingDecorator);
}

if (Platform.OS === "android") {
  addDecorator(WhiteBgColorDecorator);
}

configure(loadStories, module);

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const StorybookUI = getStorybookUI({
  port: 7007,
  host: hostname
});

AppRegistry.registerComponent("storybooknative", () => StorybookUI);
