/* eslint-env jest */

import "jsdom";
import "react-native";
import get from "lodash.get";
import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import AuthorProfile from "../author-profile";
import AuthorProfileItemSeparator from "../author-profile-item-separator";
import example from "../example.json";

example.articles.list = example.articles.list.map(el => ({
  ...el,
  publishedTime: new Date(el.publishedTime)
}));

const props = {
  slug: "fiona-hamilton",
  page: 1,
  pageSize: 2,
  result: {
    ...example,
    articles: {
      count: get(example, "articles.count", 0),
      list: get(example, "articles.list", []).map(article => ({
        ...article,
        publishedTime: new Date(article.publishedTime)
      }))
    },
    count: get(example, "articles.count")
  },
  loading: false,
  onTwitterLinkPress: () => {}
};

export default () => {
  it("renders profile", () => {
    const wrapper = shallow(<AuthorProfile {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders profile content", () => {
    const component = renderer.create(<AuthorProfile {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile loading", () => {
    const p = Object.assign({}, props, {
      result: null,
      loading: true
    });
    const component = renderer.create(<AuthorProfile {...p} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile empty", () => {
    const p = Object.assign({}, props, {
      result: null,
      loading: false
    });

    const component = renderer.create(<AuthorProfile {...p} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile error", () => {
    const p = Object.assign({}, props, {
      result: null,
      error: {
        error: "error"
      }
    });

    const component = renderer.create(<AuthorProfile {...p} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile separator", () => {
    const component = renderer.create(<AuthorProfileItemSeparator />);

    expect(component).toMatchSnapshot();
  });
};
