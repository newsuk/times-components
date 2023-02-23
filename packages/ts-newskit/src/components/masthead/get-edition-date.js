import { makeClient } from "@times-components/utils";
import { getPublicationDate } from "@times-components/provider-queries";

const client = makeClient();

const getEditionDate = id =>
  client.query({ query: getPublicationDate, variables: { id } });

export default getEditionDate;