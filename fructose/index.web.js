/* globals document */
import { AppRegistry } from "react-native";
import fructose from "@times-components/fructose";
// eslint-disable-next-line import/no-unresolved
import { getStories } from "./components";

AppRegistry.registerComponent("e2eTests", () =>
  fructose(getStories, { platform: "web" })
);
AppRegistry.runApplication("e2eTests", {
  rootTag: document.getElementById("react-root")
});
