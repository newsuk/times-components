import { AppRegistry } from "react-native";
import {
  Article,
  AuthorProfile,
  Section,
  Topic
} from "@times-components/pages";

console.disableYellowBox = true;

AppRegistry.registerComponent("Article", () => Article);
AppRegistry.registerComponent("AuthorProfile", () => AuthorProfile);
AppRegistry.registerComponent("Section", () => Section);
AppRegistry.registerComponent("Topic", () => Topic);
