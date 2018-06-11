import { AppRegistry } from "react-native";
import Fructose from "@times-components/fructose";
// eslint-disable-next-line import/no-unresolved
import { getStories } from "./components";

AppRegistry.registerComponent("storybooknative", () =>
  Fructose(getStories, { platform: "native" })
);

export default Fructose(getStories, { platform: "native" });
