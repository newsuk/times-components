import { AppRegistry } from "react-native";
import AuthorProfileView from "./pages/author-profile";
import ArticleView from "./pages/article";
import TopicView from "./pages/topic";

AppRegistry.registerComponent("AuthorProfile", () => AuthorProfileView);
AppRegistry.registerComponent("Article", () => ArticleView);
AppRegistry.registerComponent("Topic", () => TopicView);
