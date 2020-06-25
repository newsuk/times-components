import {
  topicArticles,
  topicArticlesPTV
} from "@times-components-native/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(topicArticles, topicArticlesPTV);
