import { AppRegistry } from "react-native";
import { URL, URLSearchParams } from "url-polyfill";
import {
  Article,
  AuthorProfile,
  Section,
  Topic
} from "@times-components/pages";

// see https://github.com/facebook/react-native/issues/16434
global.URL = URL;
global.URLSearchParams = URLSearchParams;

AppRegistry.registerComponent("ArticlePage", () => Article);
AppRegistry.registerComponent("AuthorProfilePage", () => AuthorProfile);
AppRegistry.registerComponent("Section", () => Section);
AppRegistry.registerComponent("TopicPage", () => Topic);
