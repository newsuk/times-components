import gql from "graphql-tag";
import {
  topicArticles,
  topicArticlesPTV
} from "@times-components/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(gql(topicArticles), topicArticlesPTV);
