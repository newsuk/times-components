import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import { iterator } from "@times-components/test-utils";
import {
  addSerializers,
  enzymeRenderedSerializer,
  minimalise
} from "@times-components/jest-serializer";
import Context from "@times-components/context";
import articleListFixture from "../../fixtures/articles.json";
import adConfig from "../../fixtures/article-ad-config.json";
import ArticleList from "../../src/article-list";

const delay = ms => new Promise(res => setTimeout(res, ms));

const omitProps = new Set(["class", "className", "style"]);

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  minimalise((value, key) => omitProps.has(key))
);

const realIntl = Intl;

const articleListProps = {
  adConfig,
  articles: articleListFixture.slice(0, 3),
  count: 3,
  emptyStateMessage:
    "Unfortunately, there are no articles relating to this page",
  imageRatio: 3 / 2,
  page: 1,
  pageSize: 5,
  refetch: () => {}
};

const intersectionObserverInstances = [];
class FakeIntersectionObserver {
  constructor(cb) {
    this.instanceId = intersectionObserverInstances.length;
    intersectionObserverInstances.push({ cb, nodes: new Set() });
  }

  observe(node) {
    Object.defineProperty(node, "clientWidth", {
      value: 600
    });
    intersectionObserverInstances[this.instanceId].nodes.add(node);
  }

  static dispatchEntriesForInstance(instanceId, makeEntries) {
    const instance = intersectionObserverInstances[instanceId];

    instance.cb(makeEntries(instance.nodes));
  }

  disconnect() {
    return this;
  }
}

beforeEach(() => {
  global.Intl = {
    DateTimeFormat: () => ({
      resolvedOptions: () => ({ timeZone: "Europe/London" })
    })
  };
});

afterEach(() => {
  global.Intl = realIntl;
  jest.restoreAllMocks();

  delete window.IntersectionObserver;
  intersectionObserverInstances.splice(0);
});

const tests = [
  {
    name: "should render a good quality image if it is visible",
    async test() {
      window.IntersectionObserver = FakeIntersectionObserver;

      const component = mount(
        <Context.Provider value={{ makeArticleUrl }}>
          <ArticleList {...articleListProps} />
        </Context.Provider>
      );
      // prove the first image starts off as low quality
      expect(
        component
          .find("TimesImage")
          .at(0)
          .props().lowResSize
      ).toEqual(100);

      expect(
        component
          .find("TimesImage")
          .at(0)
          .props().highResSize
      ).toEqual(null);

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          intersectionRatio: indx === 0 ? 0.75 : 0,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

      await delay(100);

      component.update();

      expect(
        component
          .find("TimesImage")
          .at(0)
          .props().lowResSize
      ).toEqual(100);

      expect(
        component
          .find("TimesImage")
          .at(0)
          .props().highResSize
      ).toEqual(660);
    }
  },
  {
    name: "should render a poor quality image if it is not visible",
    async test() {
      window.IntersectionObserver = FakeIntersectionObserver;

      const component = mount(
        <Context.Provider value={{ makeArticleUrl }}>
          <ArticleList {...articleListProps} />
        </Context.Provider>
      );

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          intersectionRatio: indx === 0 ? 0.75 : 0,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

      await delay(100);

      const { highResSize, lowResSize } = component
        .find("TimesImage")
        .at(1)
        .props();

      expect(lowResSize).toEqual(100);

      expect(highResSize).toEqual(null);
    }
  },
  {
    name: "should emit scroll tracking events for an article list",
    test() {
      window.IntersectionObserver = FakeIntersectionObserver;
      const reporter = jest.fn();

      const mountPoint = document.createElement("div");
      document.body.appendChild(mountPoint);

      mount(
        <ArticleList
          {...articleListProps}
          articles={articleListFixture.slice(0, 3)}
          count={3}
        />,
        {
          attachTo: mountPoint,
          childContextTypes: { makeArticleUrl: PropTypes.func },
          context: {
            makeArticleUrl,
            tracking: {
              analytics: reporter
            }
          }
        }
      );

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          isIntersecting: indx === 0,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeEntries);

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
    }
  }
];

iterator(tests);
