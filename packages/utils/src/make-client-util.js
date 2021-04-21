/* eslint-env browser */
import fetch from "unfetch";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { fragmentMatcher } from "@times-components/schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";

const makeClient = () => {
  let graphqlapi = null;
  let usePersistedQueries = null;
  let acsTnlCookie = null;
  let sacsTnlCookie = null;

  if (typeof window !== "undefined" && window.nuk) {
    graphqlapi = window.nuk.graphqlapi.url;
    usePersistedQueries = !!window.nuk.graphqlapi.usePersistedQueries;
    acsTnlCookie = window.nuk.getCookieValue("acs_tnl");
    sacsTnlCookie = window.nuk.getCookieValue("sacs_tnl");
  }
  const networkInterfaceOptions = { fetch, headers: {}, uri: graphqlapi };

  networkInterfaceOptions.headers["content-type"] =
    "application/x-www-form-urlencoded";
  networkInterfaceOptions.headers.Authorization = `Cookie acs_tnl=${acsTnlCookie};sacs_tnl=${sacsTnlCookie}`;

  const link = ApolloLink.from(
    [
      usePersistedQueries &&
        createPersistedQueryLink({ useGETForHashedQueries: true }),
      createHttpLink(networkInterfaceOptions)
    ].filter(Boolean)
  );

  return new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link
  });
};

export default makeClient;
