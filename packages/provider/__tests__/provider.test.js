/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { resetMockGraphQLProps, setMockGraphQLProps, gql } from "react-apollo";
import { Text } from "react-native";
import connectGraphql from "../provider";

beforeEach(() => {
  resetMockGraphQLProps();
});

it("renders data", () => {
  setMockGraphQLProps({ data: { loading: false, data: "data" } });

  const query = gql`
    query Query($slug: Slug!) {
      author(slug: $slug) {
        name
      }
    }
  `;
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

  const ComponentWithData = connectGraphql(query)(Component);

  const tree = renderer.create(<ComponentWithData />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders loading state", () => {
  setMockGraphQLProps({ data: { loading: true } });

  const query = gql`
    {
      article(id: "foo") {
        label
      }
    }
  `;
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

  const ComponentWithData = connectGraphql(query)(Component);

  const tree = renderer.create(<ComponentWithData />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders data from graphql", () => {
  const data = {
    data: {
      loading: false,
      data: "data"
    }
  };

  setMockGraphQLProps(data, (query, extras) => {
    expect(extras.options.variables.slug).toEqual("slug-value");
  });

  const query = gql`
    query Query($slug: Slug!) {
      author(slug: $slug) {
        twitter
      }
    }
  `;
  const Component = params => {
    expect(params.data).toEqual(data.data);
    expect(params.slug).toEqual("slug-value");
    return <Text>{JSON.stringify(params, null, 2)}</Text>;
  };

  const ComponentWithData = connectGraphql(query)(Component);

  const tree = renderer
    .create(<ComponentWithData slug={"slug-value"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders data using prop variables", done => {
  const data = {
    data: {
      loading: false,
      data: "data"
    }
  };

  setMockGraphQLProps(data, (query, extras) => {
    expect(extras.options.variables.slug).toEqual("slug-value");
    return done();
  });

  const query = gql`
    query Query($slug: Slug!) {
      author(slug: $slug) {
        name
      }
    }
  `;
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;

  const ComponentWithData = connectGraphql(query)(Component);

  renderer.create(<ComponentWithData slug={"slug-value"} />).toJSON();
});
