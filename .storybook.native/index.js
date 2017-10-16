import url from "url";
import { AppRegistry, NativeModules, Platform } from "react-native";
import { getStorybookUI, configure, addDecorator } from "@storybook/react-native";
import { loadStories } from "./story-loader";
import "./addons";
import IosBarSpacingDecorator from "../storybook/decorators/ios-bar-spacing";

if(Platform.OS === "ios"){
  addDecorator(IosBarSpacingDecorator);
}

configure(loadStories, module);

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const StorybookUI = getStorybookUI({
  port: 7007,
  host: hostname
});

AppRegistry.registerComponent("storybooknative", () => StorybookUI);
