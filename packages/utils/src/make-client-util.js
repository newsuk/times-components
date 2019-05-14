/* eslint-env browser */
import fetch from "unfetch";
import { createHttpLink } from "apollo-link-http";
import { fragmentMatcher } from "@times-components/schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";

const makeClient = () => {
  let graphqlapi = null;
  let acsTnlCookie = null;
  let sacsTnlCookie = null;

  if (typeof window !== "undefined" && window.nuk) {
    graphqlapi = window.nuk.graphqlapi.url;
    acsTnlCookie = window.nuk.getCookieValue("acs_tnl");
    sacsTnlCookie = window.nuk.getCookieValue("sacs_tnl");
  }
  const networkInterfaceOptions = { fetch, headers: {}, uri: graphqlapi };

  networkInterfaceOptions.headers["content-type"] =
    "application/x-www-form-urlencoded";
  networkInterfaceOptions.headers.Authorization = `Cookie acs_tnl=${acsTnlCookie};sacs_tnl=${sacsTnlCookie}`;

  return new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: createHttpLink(networkInterfaceOptions)
  });
};

export default makeClient;
