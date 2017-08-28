/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { resetMockGraphQLProps, setMockGraphQLProps } from "react-apollo";
import AuthorProfile from "../provider";
import example from "../example.json";

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
    .create(<AuthorProfile slug="fiona-hamilton" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders loading state", () => {
  setMockGraphQLProps({
    data: {
      loading: true
    }
  });

  const tree = renderer.create(<AuthorProfile />).toJSON();
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

  const tree = renderer.create(<AuthorProfile slug="slug-value" />).toJSON();
  expect(tree).toMatchSnapshot();
});
