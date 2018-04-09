import { AppRegistry } from "react-native";
import Fructose from "@times-components/fructose";
// eslint-disable-next-line import/no-unresolved
import { loadStories } from "./components";

AppRegistry.registerComponent("storybooknative", () => Fructose(loadStories));

export default Fructose(loadStories);
