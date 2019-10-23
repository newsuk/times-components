import { AppRegistry } from "react-native";
import Page from "@times-components/pages";
import { FontStorage } from "@times-components/typeset";
import ttf from "../fonts";

Object.keys(ttf).forEach(fontName => {
  FontStorage.registerFont(fontName, ttf[fontName]);
});

AppRegistry.registerComponent("ArticlePage", () => Page("Article"));
AppRegistry.registerComponent("AuthorProfilePage", () => Page("AuthorProfile"));
AppRegistry.registerComponent("Section", () => Page("Section"));
AppRegistry.registerComponent("TopicPage", () => Page("Topic"));
