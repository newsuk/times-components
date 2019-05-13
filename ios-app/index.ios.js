import { AppRegistry } from "react-native";
import {
  Article,
  AuthorProfile,
  Section,
  Topic
} from "@times-components/pages";

AppRegistry.registerComponent("ArticlePage", () => Article);
AppRegistry.registerComponent("AuthorProfilePage", () => AuthorProfile);
AppRegistry.registerComponent("Section", () => Section);
AppRegistry.registerComponent("TopicPage", () => Topic);
