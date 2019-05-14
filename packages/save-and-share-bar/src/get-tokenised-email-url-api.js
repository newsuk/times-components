import { getTokenisedEmailUrl } from "@times-components/provider-queries";
import { makeClient } from "@times-components/utils";

const client = makeClient();

export default url => client.query({ query: getTokenisedEmailUrl, variables: { url } });;