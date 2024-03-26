// @ts-ignore
import { getTokenisedArticleUrl } from '@times-components/provider-queries';
// @ts-ignore
import { makeClient } from '@times-components/utils';

const client = makeClient();

export const getTokenisedArticleUrlApi = (id: string) =>
  client.query({ query: getTokenisedArticleUrl, variables: { id } });
