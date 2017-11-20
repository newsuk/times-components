/* eslint-env jest */

import "raf/polyfill";

import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import test from "./author-profile-helper";
import AuthorProfileItem from "../author-profile-item";
import AuthorProfileContent from "../author-profile-content.web.js";
import authorProfileFixture from "../fixtures/author-profile.json";
import articleListFixture from "../fixtures/article-list.json";

Enzyme.configure({ adapter: new React16Adapter() });

test(AuthorProfileContent);

const results = {
  data: {
    author: {
      ...articleListFixture.data.author,
      articles: {
        ...articleListFixture.data.author.articles,
        list: articleListFixture.data.author.articles.list.map(el => ({
          ...el,
          publishedTime: new Date(el.publishedTime)
        }))
      }
    }
  }
};

it("renders profile articles and invoke callback on article press", done => {
  const component = shallow(
    <AuthorProfileContent
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => done()}
    />
  );

  component
    .find(AuthorProfileItem)
    .at(0)
    .dive()
    .dive()
    .find("Link")
    .simulate("press");
});
