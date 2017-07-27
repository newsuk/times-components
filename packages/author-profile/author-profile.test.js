/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AuthorProfile from "./author-profile";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import example from "./example.json";

const props = {
  name: example.name,
  jobTitle: example.jobTitle,
  biography: example.biography,
  image: example.image,
  twitter: example.twitter,
  articleCount: example.articles.count,
  currentPageOfArticles: example.articles.list,
  currentPageOffset: 0,
  pageSize: 10
};

it("renders correctly", () => {
  const component = renderer.create(<AuthorProfile {...props} />);

  expect(component).toMatchSnapshot();
});

it("renders profile header", () => {
  const component = renderer.create(<AuthorProfileHeader {...props} />);

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
