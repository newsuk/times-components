/* globals document */
import { AppRegistry } from "react-native";
import fructose from "@times-components/fructose";
// eslint-disable-next-line import/no-unresolved
import { loadStories } from "./components";

AppRegistry.registerComponent("e2eTests", () => fructose(loadStories));
AppRegistry.runApplication("e2eTests", {
  rootTag: document.getElementById("react-root")
});
