import { AppRegistry } from "react-native";
import { URL, URLSearchParams } from "url-polyfill";
import {
  Article,
  AuthorProfile,
  Section,
  Topic
} from "@times-components/pages";

AppRegistry.registerComponent("Article", () => Article);
AppRegistry.registerComponent("AuthorProfile", () => AuthorProfile);
AppRegistry.registerComponent("Section", () => Section);
AppRegistry.registerComponent("Topic", () => Topic);
