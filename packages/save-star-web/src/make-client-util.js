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

  // graphqlapi = "https://prod-tpa.prod.thetimes.works/graphql";
  // acsTnlCookie = "tid%3D77a8739a-fbad-4344-9bf8-09c33a49ed6b%26eid%3DAAAA002920174%26e%3D1%26a%3DTmVoYSBTcml2YXN0YXZh%26u%3D1910c402-2cf6-40dd-bb1e-4ee24e1e7f6b%26t%3D1554976444%26h%3D5f091672fb6e3258934b91f8715e2753";
  // sacsTnlCookie = "1ff9a858-8f31-43f3-bb8a-4366dfcb858e";

  if (window.nuk) {
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
