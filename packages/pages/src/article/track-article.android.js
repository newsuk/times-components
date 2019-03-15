import { NativeModules } from "react-native";

const { track } = NativeModules.ReactAnalytics;
const { onArticleLoaded } = NativeModules.ArticleEvents;

export default event => {
  if (event.object === "Article" && event.action === "Viewed") {
    onArticleLoaded(event.attrs.articleId, event);
  } else {
    track(event);
  }
};
