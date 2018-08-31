import { AppRegistry } from "react-native";
import AuthorProfileView from "./src/pages/author-profile";
import ArticleView from "./src/pages/article";
import ArticleWithNativeProvider from "./src/pages/article-with-native-provider";
import TopicView from "./src/pages/topic";

AppRegistry.registerComponent("AuthorProfile", () => AuthorProfileView);
AppRegistry.registerComponent("Article", () => ArticleView);
AppRegistry.registerComponent(
  "ArticleWithNativeProvider",
  () => ArticleWithNativeProvider
);
AppRegistry.registerComponent("Topic", () => TopicView);
