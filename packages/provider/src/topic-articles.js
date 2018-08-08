import {
  topicArticles,
  topicArticlesPTV
} from "@times-components/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(topicArticles, topicArticlesPTV);
