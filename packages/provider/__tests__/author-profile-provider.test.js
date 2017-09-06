/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { Text } from "react-native";
import { resetMockGraphQLProps, setMockGraphQLProps } from "react-apollo";
import { AuthorProfileProvider } from "../provider";
import example from "../example.json";

beforeEach(() => {
  resetMockGraphQLProps();
});

it("renders data", () => {
  setMockGraphQLProps({
    data: {
      loading: false,
      data: {
        author: example
      }
    }
  });

  const tree = renderer
    .create(
      <AuthorProfileProvider slug="fiona-hamilton">
        {props => {
          expect(props.loading).toEqual(false);
          expect(props.result.author).toEqual(example);
          return (
            <Text>
              {JSON.stringify(props, null, 2)}
            </Text>
          );
        }}
      </AuthorProfileProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders loading state", () => {
  setMockGraphQLProps({
    data: {
      loading: true
    }
  });

  const tree = renderer
    .create(
      <AuthorProfileProvider slug="fiona-hamilton">
        {props => {
          expect(props.loading).toEqual(true);
          return (
            <Text>
              {JSON.stringify(props, null, 2)}
            </Text>
          );
        }}
      </AuthorProfileProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders data from graphql", () => {
  const data = {
    data: {
      loading: false,
      author: example
    }
  };

  setMockGraphQLProps(data);

  const tree = renderer
    .create(
      <AuthorProfileProvider slug="fiona-hamilton">
        {props => {
          expect(props.loading).toEqual(false);
          return (
            <Text>
              {JSON.stringify(props, null, 2)}
            </Text>
          );
        }}
      </AuthorProfileProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
