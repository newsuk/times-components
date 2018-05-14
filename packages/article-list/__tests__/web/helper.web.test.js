/* global context */
/* eslint-env browser */
import React from "react";
import { mount } from "enzyme";
import articleListWithImagesFixture from "@times-components/provider-test-tools/fixtures/author-profile/article-list-with-images.json";
import ArticleList from "../../src/article-list";
import { scrollUpToPaging } from "../../src/utils";
import pagedResult from "../paged-result";

const delay = ms => new Promise(res => setTimeout(res, ms));

describe("Lazy loading and pagination tests on web", () => {
  const realIntl = Intl;

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
  });

  beforeAll(() => jest.useRealTimers());
  afterAll(() => jest.useFakeTimers());

  const articleListContentProps = {
    articles: articleListWithImagesFixture.data.author.articles.list,
    count: articleListWithImagesFixture.data.author.articles.list.length,
    imageRatio: 3 / 2,
    onArticlePress: () => {},
    onTwitterLinkPress: () => {},
    page: 1,
    pageSize: 3,
    refetch: () => {}
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

    static dispatchEntriesForInstance(instanceId, makeEntries) {
      const instance = intersectionObserverInstances[instanceId];

      instance.cb(makeEntries(instance.nodes));
    }

    disconnect() {
      return this;
    }
  }

  afterEach(() => {
    delete window.IntersectionObserver;
    intersectionObserverInstances.splice(0);
  });

  context("Lazy loading tests", () => {
    it("should render with an intersection observer using the expected options", () => {
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

      mount(<ArticleList {...articleListContentProps} />);

      expect(optsSpy.mock.calls[1][0]).toMatchSnapshot();
    });

    it("should render a good quality image if it is visible", async () => {
      window.IntersectionObserver = FakeIntersectionObserver;

      const component = mount(<ArticleList {...articleListContentProps} />);

      // prove the first image starts off as low quality
      expect(
        component
          .find("TimesImage")
          .at(0)
          .props().uri
      ).toEqual(
        "//www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F1b5afe88-cb0d-11e7-9ee9-e45ae7e1cdd4.jpg?crop=4252%2C2835%2C0%2C0&resize=100"
      );

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          target: node,
          intersectionRatio: indx === 0 ? 0.75 : 0
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

      await delay(100);

      expect(
        component
          .find("TimesImage")
          .at(0)
          .render()
      ).toMatchSnapshot();
    });

    it("should render a poor quality image if it is not visible", async () => {
      window.IntersectionObserver = FakeIntersectionObserver;

      const component = mount(<ArticleList {...articleListContentProps} />);

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          target: node,
          intersectionRatio: indx === 0 ? 0.75 : 0
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

      await delay(100);

      expect(
        component
          .find("TimesImage")
          .at(1)
          .render()
      ).toMatchSnapshot();
    });

    it("should render good quality images if there is no IntersectionObserver", () => {
      const component = mount(
        <ArticleList
          {...articleListContentProps}
          articles={articleListWithImagesFixture.data.author.articles.list.slice(
            0,
            2
          )}
        />
      );

      // not ideal as this relies on the actual implementation but there's no "nice" way of setting clientWidth
      const authorProfileInstance = component.find("ArticleList").instance();
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

    it("should not render good quality images if the item is scrolled past quickly", async () => {
      window.IntersectionObserver = FakeIntersectionObserver;

      const component = mount(
        <ArticleList
          {...articleListContentProps}
          articles={articleListWithImagesFixture.data.author.articles.list.slice(
            0,
            5
          )}
        />
      );

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          target: node,
          intersectionRatio: indx === 0 ? 0.75 : 0
        }));
      window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

      await delay(20);

      const makeNewEntries = nodes =>
        [...nodes].map((node, indx) => ({
          target: node,
          intersectionRatio: indx === 0 ? 0.25 : 0.75
        }));
      window.IntersectionObserver.dispatchEntriesForInstance(1, makeNewEntries);

      await delay(100);

      expect(component.render().find("img")).toMatchSnapshot();
    });

    it("should not work if there are no pending items", async () => {
      window.IntersectionObserver = FakeIntersectionObserver;

      const spy = jest.spyOn(ArticleList.prototype, "setState");

      mount(
        <ArticleList
          {...articleListContentProps}
          articles={articleListWithImagesFixture.data.author.articles.list.slice(
            0,
            5
          )}
        />
      );

      // View all items
      const makeEntries = nodes =>
        [...nodes].map(node => ({
          target: node,
          intersectionRatio: 0.75
        }));
      window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

      await delay(20);

      // Scroll passed all items before setting state
      const makeNewEntries = nodes =>
        [...nodes].map(node => ({
          target: node,
          intersectionRatio: 0
        }));
      window.IntersectionObserver.dispatchEntriesForInstance(1, makeNewEntries);

      await delay(100);

      // No work was done
      expect(spy).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it("should not set state after unmounting", async () => {
      window.IntersectionObserver = FakeIntersectionObserver;

      const setStateSpy = jest.spyOn(ArticleList.prototype, "setState");

      const component = mount(
        <ArticleList
          {...articleListContentProps}
          articles={articleListWithImagesFixture.data.author.articles.list.slice(
            0,
            5
          )}
        />
      );

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          target: node,
          intersectionRatio: indx === 0 ? 0.75 : 0
        }));
      window.IntersectionObserver.dispatchEntriesForInstance(1, makeEntries);

      await delay(20);

      const makeNewEntries = nodes =>
        [...nodes].map((node, indx) => ({
          target: node,
          intersectionRatio: indx === 0 ? 0.25 : 0.75
        }));
      window.IntersectionObserver.dispatchEntriesForInstance(1, makeNewEntries);

      await delay(0);

      component.unmount();

      await delay(100);

      expect(setStateSpy.mock.calls.length).toBe(0);

      setStateSpy.mockRestore();
    });

    it("should disconnect from the IntersectionObserver when unmounting", async () => {
      window.IntersectionObserver = FakeIntersectionObserver;

      const disconnectSpy = jest.spyOn(
        window.IntersectionObserver.prototype,
        "disconnect"
      );

      const component = mount(
        <ArticleList
          {...articleListContentProps}
          articles={articleListWithImagesFixture.data.author.articles.list.slice(
            0,
            5
          )}
        />
      );

      component.unmount();

      expect(disconnectSpy).toHaveBeenCalled();

      disconnectSpy.mockRestore();
    });

    it("should not throw when unmounting with no IntersectionObserver", async () => {
      delete window.IntersectionObserver;

      const component = mount(
        <ArticleList
          {...articleListContentProps}
          articles={articleListWithImagesFixture.data.author.articles.list.slice(
            0,
            5
          )}
        />
      );

      expect(component.unmount.bind(component)).not.toThrow();
    });

    it("should emit scroll tracking events for an article list", () => {
      window.IntersectionObserver = FakeIntersectionObserver;
      const reporter = jest.fn();
      const pageResults = pagedResult(0, 3);

      const mountPoint = document.createElement("div");
      document.body.appendChild(mountPoint);

      mount(
        <ArticleList
          {...articleListContentProps}
          articles={pageResults.articles.list}
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

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          target: node,
          isIntersecting: indx === 0
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
    });
  });

  context("Pagination tests", () => {
    it("should scroll to the top when moving to the previous page on bottom pagination click", () => {
      const onScroll = jest.spyOn(window, "scroll");
      const onPrev = jest.fn();
      const component = mount(
        <ArticleList {...articleListContentProps} page={2} onPrev={onPrev} />
      );

      component
        .find({ href: "?page=1" })
        .last()
        .simulate("click");

      expect(onScroll).toHaveBeenCalledWith({ left: 0, top: 0 });
    });

    it("should scroll to the top when moving to the next page on bottom pagination click", () => {
      const onScroll = jest.spyOn(window, "scroll");
      const onNext = jest.fn();
      const component = mount(
        <ArticleList {...articleListContentProps} page={2} onNext={onNext} />
      );

      component
        .find({ href: "?page=3" })
        .last()
        .simulate("click");

      expect(onScroll).toHaveBeenCalledWith({ left: 0, top: 0 });
    });

    it("should scroll to the top when moving to the previous page on top pagination click", () => {
      const onScroll = jest.spyOn(window, "scroll");
      const onPrev = jest.fn();
      const component = mount(
        <ArticleList {...articleListContentProps} page={2} onPrev={onPrev} />
      );

      component
        .find({ href: "?page=1" })
        .first()
        .simulate("click");

      expect(onScroll).not.toHaveBeenCalledWith({ left: 0, top: 0 });
    });

    it("should scroll to the top when moving to the next page on top pagination click", () => {
      const onScroll = jest.spyOn(window, "scroll");
      const onNext = jest.fn();
      const component = mount(
        <ArticleList {...articleListContentProps} page={2} onNext={onNext} />
      );

      component
        .find({ href: "?page=3" })
        .first()
        .simulate("click");

      expect(onScroll).not.toHaveBeenCalledWith({ left: 0, top: 0 });
    });

    it("should scroll the window object", () => {
      const scrollMock = jest.fn();
      const windowObject = {
        scroll: scrollMock
      };

      scrollUpToPaging(windowObject);

      expect(scrollMock).toHaveBeenCalledWith({
        left: 0,
        top: 0
      });
    });

    it("should return if the window object cannot be found", () => {
      expect(scrollUpToPaging()).toEqual(undefined);
    });
  });
});
