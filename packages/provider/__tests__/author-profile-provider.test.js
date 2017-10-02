/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { resetMockGraphQLProps, setMockGraphQLProps } from "react-apollo";
import { AuthorProfileProvider } from "../provider";
import example from "../provider-fixtures/author-profile.json";

beforeEach(() => {
  resetMockGraphQLProps();
});

it("renders data", () => {
  setMockGraphQLProps({
    data: {
      loading: false,
      author: example
    }
  });

  const tree = renderer
    .create(<AuthorProfileProvider slug="fiona-hamilton" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders loading state", () => {
  setMockGraphQLProps({
    data: {
      loading: true
    }
  });

  const tree = renderer.create(<AuthorProfileProvider />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders data from graphql", done => {
  const data = {
    data: {
      loading: false,
      author: example
    }
  };

  setMockGraphQLProps(data, (query, extras) => {
    expect(extras.options.variables.slug).toEqual("slug-value");
    return done();
  });

  const tree = renderer
    .create(<AuthorProfileProvider slug="slug-value" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
