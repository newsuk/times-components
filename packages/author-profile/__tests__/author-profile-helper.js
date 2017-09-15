/* eslint-env jest */

import "jsdom";
import "react-native";
import React from "react";
import { resetMockGraphQLProps, setMockGraphQLProps } from "react-apollo";
import renderer from "react-test-renderer";
import example from "../example.json";

example.articles.list = example.articles.list.map(el => ({
  ...el,
  publishedTime: new Date(el.publishedTime)
}));

const props = {
  slug: "fiona-hamilton",
  imageRatio: "3:2"
};

beforeEach(() => {
  resetMockGraphQLProps();
});

export default AuthorProfile => {
  it("renders profile", () => {
    setMockGraphQLProps({
      data: {
        loading: false,
        author: example
      }
    });

    const wrapper = renderer.create(<AuthorProfile {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders profile loading", () => {
    setMockGraphQLProps({
      data: {
        loading: true
      }
    });

    const component = renderer.create(<AuthorProfile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("renders profile empty", () => {
    setMockGraphQLProps({
      data: {
        loading: false,
        author: {
          ...example,
          articles: {
            count: 0,
            list: []
          }
        }
      }
    });

    const component = renderer.create(<AuthorProfile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("renders profile error", () => {
    setMockGraphQLProps({
      data: {
        loading: false,
        error: "error"
      }
    });

    const component = renderer.create(<AuthorProfile {...props} />);
    expect(component).toMatchSnapshot();
  });
};
