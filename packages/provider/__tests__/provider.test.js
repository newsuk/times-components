/* eslint-env jest */
/* eslint-disable graphql/template-strings */

import React from "react";
import renderer from "react-test-renderer";
import { resetMockGraphQLProps, setMockGraphQLProps, gql } from "react-apollo";
import { Text } from "react-native";
import connect from "../provider";

beforeEach(() => {
  resetMockGraphQLProps();
});

it("renders data", () => {
  setMockGraphQLProps({ data: { loading: false, data: "data" } });

  const query = gql`
    query Query($slug: Slug!) {
      random
    }
  `;
  const Query = connect(query);

  const tree = renderer
    .create(
      <Query>{props => <Text>{JSON.stringify(props, null, 2)}</Text>}</Query>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders loading state", () => {
  setMockGraphQLProps({ data: { loading: true } });

  const query = gql`
    {
      random
    }
  `;
  const Query = connect(query);

  const tree = renderer
    .create(
      <Query>{props => <Text>{JSON.stringify(props, null, 2)}</Text>}</Query>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders data from graphql", () => {
  const data = {
    data: {
      loading: false,
      data: "data"
    }
  };

  setMockGraphQLProps(data);

  const query = gql`
    query Query($slug: Slug!) {
      random
    }
  `;
  const Query = connect(query);

  const tree = renderer
    .create(
      <Query slug="slug-value">
        {props => {
          expect(props.slug).toEqual("slug-value");
          expect(props.data).toEqual("data");
          return <Text>{JSON.stringify(props, null, 2)}</Text>;
        }}
      </Query>
    )
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
      random
    }
  `;
  const Query = connect(query);

  const tree = renderer
    .create(
      <Query slug="slug-value">
        {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
      </Query>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
