import { getTokenisedArticleUrl } from "@times-components-native/provider-queries";
import { makeClient } from "@times-components-native/utils";

const client = makeClient();

const getTokenisedArticleUrlApi = id =>
  client.query({ query: getTokenisedArticleUrl, variables: { id } });

export default getTokenisedArticleUrlApi;
