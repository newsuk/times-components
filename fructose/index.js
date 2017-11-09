import { AppRegistry } from "react-native";
import Fructose from "@times-components/fructose";
import { loadStories } from "./components";

AppRegistry.registerComponent("storybooknative", () => Fructose(loadStories));
