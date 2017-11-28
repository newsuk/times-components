/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import test from "./author-profile-helper";
import AuthorProfileItem from "../author-profile-item";
import AuthorProfileContent from "../author-profile-content.web.js";
import authorProfileFixture from "../fixtures/author-profile.json";
import articleListFixture from "../fixtures/article-list.json";

test(AuthorProfileContent);

afterEach(() => {
  delete window.IntersectionObserver;
});

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

class FakeIntersectionObserver {
  constructor(cb) {
    this.constructor.nodes = new Set();
    this.constructor.cb = cb;
  }

  observe(node) {
    Object.defineProperty(node, "clientWidth", {
      value: 600
    });
    this.constructor.nodes.add(node);
  }

  static dispatchAll() {
    const entries = [...this.nodes].map((node, indx) => ({
      target: node,
      isIntersecting: indx === 0
    }));

    this.cb(entries);
  }
}

it("renders profile articles and invoke callback on article press", done => {
  const component = shallow(
    <AuthorProfileContent
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => done()}
      onViewed={() => {}}
      receiveChildList={() => results.data.author.articles.list}
    />
  );

  component
    .dive()
    .find(AuthorProfileItem)
    .at(0)
    .dive()
    .dive()
    .find("Link")
    .simulate("press");
});

it("renders with an intersection observer which uses the expected options", done => {
  window.IntersectionObserver = class {
    constructor(cb, opts) {
      expect(opts).toMatchSnapshot();
      done();
    }
  };

  shallow(
    <AuthorProfileContent
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
    />
  );
});

it("renders a good quality image if it is visible", () => {
  window.IntersectionObserver = FakeIntersectionObserver;

  const component = mount(
    <AuthorProfileContent
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
    />
  );

  // prove the first image starts off as low quality
  expect(
    component
      .find("TimesImage")
      .at(0)
      .props().uri
  ).toEqual(
    "//www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F1b5afe88-cb0d-11e7-9ee9-e45ae7e1cdd4.jpg?crop=4252%2C2835%2C0%2C0&resize=100"
  );

  window.IntersectionObserver.dispatchAll();

  expect(
    component
      .find("TimesImage")
      .at(0)
      .render()
  ).toMatchSnapshot();
});

it("renders a poor quality image if it is not visible", () => {
  window.IntersectionObserver = FakeIntersectionObserver;

  const component = mount(
    <AuthorProfileContent
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
    />
  );

  window.IntersectionObserver.dispatchAll();

  expect(
    component
      .find("TimesImage")
      .at(1)
      .render()
  ).toMatchSnapshot();
});

it("renders good quality images if there is no IntersectionObserver", () => {
  const component = mount(
    <AuthorProfileContent
      articles={results.data.author.articles.list.slice(0, 2)}
      author={authorProfileFixture.data.author}
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
    />
  );

  // not ideal as this relies on the actual implementation but there's no "nice" way of setting clientWidth
  const authorProfileInstance = component.find('AuthorProfileContent').instance();
  const rn = authorProfileInstance.registerNode;
  authorProfileInstance.registerNode = node => {
    if (node) {
      Object.defineProperty(node, "clientWidth", {
        value: 600
      });
    }

    rn.call(authorProfileInstance, node);
  };

  // we have to force the render lifecycle that the lazy images rely on, in that first the nodes are registered
  // and then when we render again after loading, we show the sized images
  component.setProps({
    isLoading: true
  });

  component.setProps({
    isLoading: false
  });

  expect(component.find("TimesImage")).toMatchSnapshot();
});
