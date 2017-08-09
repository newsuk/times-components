import {
  ApolloClient,
  createNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Media",
          possibleTypes: [
            {
              name: "Image"
            },
            {
              name: "Video"
            }
          ]
        }
      ]
    }
  }
});

const networkInterface = createNetworkInterface({
  uri: "http://localhost:4000/graphql/"
});

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

export default client;
