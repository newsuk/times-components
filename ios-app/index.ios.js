import { AppRegistry } from "react-native";
import { URL, URLSearchParams } from "url-polyfill";
import AuthorProfileView from "./pages/author-profile";
import ArticleView from "./pages/article";
import SimpleArticleView from "./pages/simple-article";
import TopicView from "./pages/topic";

// see https://github.com/facebook/react-native/issues/16434
global.URL = URL;
global.URLSearchParams = URLSearchParams;

AppRegistry.registerComponent("AuthorProfilePage", () => AuthorProfileView);
AppRegistry.registerComponent("ArticlePage", () => ArticleView);
AppRegistry.registerComponent("SimpleArticlePage", () => SimpleArticleView);
AppRegistry.registerComponent("TopicPage", () => TopicView);
