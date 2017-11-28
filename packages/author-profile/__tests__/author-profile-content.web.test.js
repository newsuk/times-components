/* eslint-env jest, browser */

import React from "react";
import { shallow, mount } from "enzyme";
import test from "./author-profile-helper";
import AuthorProfileItem from "../author-profile-item";
import AuthorProfileContent from "../author-profile-content.web.js"; // TODO remove .web
import authorProfileFixture from "../fixtures/author-profile.json";
import articleListFixture from "../fixtures/article-list.json";
import pagedResult from "./paged-result";

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

const intersectionObserverInstances = [];
class FakeIntersectionObserver {
  constructor(cb) {
    this.instanceId = intersectionObserverInstances.length;
    intersectionObserverInstances.push({ nodes: new Set(), cb });
  }

  observe(node) {
    Object.defineProperty(node, "clientWidth", {
      value: 600
    });
    intersectionObserverInstances[this.instanceId].nodes.add(node);
  }

  static dispatchEntriesForInstance(instanceId) {
    const instance = intersectionObserverInstances[instanceId];
    const entries = [...instance.nodes].map((node, indx) => ({
      target: node,
      isIntersecting: indx === 0
    }));
    instance.cb(entries);
  }
}

afterEach(() => {
  delete window.IntersectionObserver;
  intersectionObserverInstances.splice(0);
});

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

it("renders with an intersection observer which uses the expected options", () => {
  // IntersectionObserver is used twice by AuthorProfileContent, once for image
  // resizing and once for scroll tracking. We capture the opts passed so that
  // we can assert on them later.
  const optsSpy = jest.fn();
  window.IntersectionObserver = class {
    constructor(cb, opts) {
      optsSpy(opts);
    }
    observe() {} // eslint-disable-line class-methods-use-this
  };

  mount(
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

  expect(optsSpy.mock.calls[1][0]).toMatchSnapshot();
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

  window.IntersectionObserver.dispatchEntriesForInstance(1);

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

  window.IntersectionObserver.dispatchEntriesForInstance(1);

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
  const authorProfileInstance = component
    .find("AuthorProfileContent")
    .instance();
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

it("emits scroll tracking events for author profile content", () => {
  window.IntersectionObserver = FakeIntersectionObserver;
  const reporter = jest.fn();
  const pageResults = pagedResult(0, 3);

  const mountPoint = document.createElement("div");
  document.body.appendChild(mountPoint);

  mount(
    <AuthorProfileContent
      count={10}
      articles={pageResults.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
    />,
    {
      context: {
        tracking: {
          analytics: reporter
        }
      },
      attachTo: mountPoint
    }
  );

  window.IntersectionObserver.dispatchEntriesForInstance(0);

  expect(reporter).toHaveBeenCalledWith(
    expect.objectContaining({
      attrs: expect.objectContaining({
        scrollDepth: {
          itemNumber: 1,
          total: 3
        }
      })
    })
  );
});
