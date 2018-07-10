import { AppRegistry } from "react-native";
import AuthorProfileView from "./pages/author-profile";
import ArticleView from "./pages/article";
import TopicView from "./pages/topic";

AppRegistry.registerComponent("AuthorProfilePage", () => AuthorProfileView);
AppRegistry.registerComponent("ArticlePage", () => ArticleView);
AppRegistry.registerComponent("TopicPage", () => TopicView);
