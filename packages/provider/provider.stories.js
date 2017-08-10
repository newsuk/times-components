import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { gql } from "react-apollo";
import { withApolloProvider } from "storybook-addon-apollo-graphql";
import connectGraphql from "./provider.js";

const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

const schema = `
    type Query {
        random: Int!
    }
`;

const root = {
  random: () => Math.floor(Math.random() * 10)
};

const query = gql`{ random }`;

storiesOf("Provider", module)
  .addDecorator(withApolloProvider({ schema, root }))
  .add("Provider", () => {
    const WithData = connectGraphql(query)(Component);
    return <WithData />;
  });
