import { AppRegistry } from "react-native";
import {
  Article,
  AuthorProfile,
  Section,
  Topic
} from "@times-components/pages";
import { Text } from "@times-components/text-flow";
import fonts from "./fonts";

Object.keys(fonts).forEach(fontName => {
  const data = fonts[fontName];
  Text.FontLoader.loadFont(fontName, data);
});

AppRegistry.registerComponent("Article", () => Article);
AppRegistry.registerComponent("AuthorProfile", () => AuthorProfile);
AppRegistry.registerComponent("Section", () => Section);
AppRegistry.registerComponent("Topic", () => Topic);
