/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { setMockGraphQLProps, gql } from "react-apollo";
import { Text } from "react-native";
import connectGraphql from "./provider";

it("renders data", () => {
  setMockGraphQLProps({ data: { loading: false, data: "stuff" } });

  const query = gql`query Query($slug: Slug!) { random }`;
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

  const ComponentWithData = connectGraphql(query)(Component);

  const tree = renderer.create(<ComponentWithData />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders loading state", () => {
  setMockGraphQLProps({ data: { loading: true } });

  const query = gql`{ random }`;
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

  const ComponentWithData = connectGraphql(query)(Component);

  const tree = renderer.create(<ComponentWithData />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders data", () => {
  const data = {
    data: {
      loading: false,
      data: "data"
    }
  };

  setMockGraphQLProps(data, (query, extras) => {
    expect(extras.options.variables.slug).toEqual("slug-value");
  });

  const query = gql`query Query($slug: Slug!) { random }`;
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

  const ComponentWithData = connectGraphql(query)(Component);

  const tree = renderer
    .create(<ComponentWithData slug={"slug-value"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
