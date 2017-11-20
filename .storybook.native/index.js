import url from "url";
import { AppRegistry, NativeModules, Platform } from "react-native";
import {
  getStorybookUI,
  configure,
  addDecorator
} from "@storybook/react-native";
import { loadStories } from "./story-loader";
import "./addons";
import IosBarSpacingDecorator from "../storybook/decorators/ios-bar-spacing";
import WhiteBgColorDecorator from "../storybook/decorators/white-bg-color";

if (Platform.OS === "ios") {
  addDecorator(IosBarSpacingDecorator);
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
