import { AppRegistry } from "react-native";
import { URL, URLSearchParams } from "whatwg-url";
import AuthorProfileView from "./pages/author-profile";
import ArticleView from "./pages/article";
import TopicView from "./pages/topic";

// see https://github.com/facebook/react-native/issues/16434
global.URL = URL;
global.URLSearchParams = URLSearchParams;

AppRegistry.registerComponent("AuthorProfile", () => AuthorProfileView);
AppRegistry.registerComponent("Article", () => ArticleView);
AppRegistry.registerComponent("Topic", () => TopicView);
