import "core-js";
import "regenerator-runtime/runtime";
import { AppRegistry } from "react-native";
import { FontStorage } from "@times-components/typeset";
import StorybookUIRoot from "./storybook";
import ttf from "../fonts";

Object.keys(ttf).forEach(fontName => {
  FontStorage.registerFont(fontName, ttf[fontName]);
});

// Suppress all warnings (WIP solution until issues are correctly addressed)
// YellowBox.ignoreWarnings([""]);

AppRegistry.registerComponent("storybooknative", () => StorybookUIRoot);
