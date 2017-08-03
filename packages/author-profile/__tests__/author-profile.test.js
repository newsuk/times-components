/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AuthorProfile from "../author-profile";
import AuthorProfileFooter from "../author-profile-footer";
import AuthorProfileHeader from "../author-profile-header";
import AuthorProfileItemSeparator from "../author-profile-item-separator";
import AuthorProfileContent from "../author-profile-content";
import example from "../example.json";

const props = {
  pageSize: 10,
  page: 1,
  data: {
    loading: false,
    author: Object.assign({}, example, {
      count: example.articles.count,
      page: 1,
      pageSize: 10
    })
  }
};

it("renders profile content", () => {
  const component = renderer.create(<AuthorProfile {...props} />);

  expect(component).toMatchSnapshot();
});

it("renders profile loading", () => {
  const p = Object.assign({}, props, {
    data: {
      loading: true,
      author: null
    }
  });
  const component = renderer.create(<AuthorProfile {...p} />);

  expect(component).toMatchSnapshot();
});

it("renders profile empty", () => {
  const p = Object.assign({}, props, {
    data: {
      loading: false,
      author: null
    }
  });

  const component = renderer.create(<AuthorProfile {...p} />);

  expect(component).toMatchSnapshot();
});

it("renders profile header", () => {
  const component = renderer.create(
    <AuthorProfileHeader {...props.data.author} />
  );

  expect(component).toMatchSnapshot();
});

it("renders profile footer", () => {
  const component = renderer.create(<AuthorProfileFooter />);

  expect(component).toMatchSnapshot();
});

it("renders profile separator", () => {
  const component = renderer.create(<AuthorProfileItemSeparator />);

  expect(component).toMatchSnapshot();
});

it("renders profile content", () => {
  const component = renderer.create(
    <AuthorProfileContent {...props.data.author} />
  );

  expect(component).toMatchSnapshot();
});
