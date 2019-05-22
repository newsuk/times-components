import { getTokenisedArticleUrl } from "@times-components/provider-queries";
import { makeClient } from "@times-components/utils";

const client = makeClient();

const getTokenisedArticleUrlApi = id =>
  client.query({ query: getTokenisedArticleUrl, variables: { id } });

export default getTokenisedArticleUrlApi;
