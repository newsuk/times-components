import React from "react";
import { shallow, mount } from "enzyme";
import { iterator } from "@times-components/test-utils";
import {
  addSerializers,
  enzymeRenderedSerializer,
  minimalise
} from "@times-components/jest-serializer";
import articleListFixture from "../fixtures/articles.json";
import adConfig from "../fixtures/article-ad-config.json";
import ArticleList from "../src/article-list";

const delay = ms => new Promise(res => setTimeout(res, ms));

const omitProps = new Set(["class", "className", "style"]);

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    minimalise((value, key) => omitProps.has(key))
  );

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

  const tests = [
    {
      name:
        "should render with an intersection observer using the expected options",
      test() {
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

        mount(<ArticleList {...articleListProps} />);

        expect(optsSpy.mock.calls[1][0]).toMatchSnapshot();
      }
    },
    {
      name: "should render a good quality image if it is visible",
      async test() {
        window.IntersectionObserver = FakeIntersectionObserver;

        const component = mount(<ArticleList {...articleListProps} />);

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
            target: node,
            intersectionRatio: indx === 0 ? 0.75 : 0
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

        const component = mount(<ArticleList {...articleListProps} />);

        const makeEntries = nodes =>
          [...nodes].map((node, indx) => ({
            target: node,
            intersectionRatio: indx === 0 ? 0.75 : 0
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
      name:
        "should render good quality images if there is no IntersectionObserver",
      test() {
        Object.defineProperty(window, "clientWidth", { value: 600 });
        const component = mount(
          <ArticleList
            {...articleListProps}
            articles={articleListFixture.slice(0, 2)}
            count={2}
          />
        );

        component
          .find("TimesImage")
          .forEach(wrapper => expect(wrapper.props().highResSize).toEqual(660));
      }
    },
    {
      name:
        "should not render good quality images if the item is scrolled past quickly",
      async test() {
        window.IntersectionObserver = FakeIntersectionObserver;

        const component = mount(
          <ArticleList {...articleListProps} articles={articleListFixture} />
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

        window.IntersectionObserver.dispatchEntriesForInstance(
          1,
          makeNewEntries
        );

        await delay(100);

        const isLowQuality = wrapper => {
          const props = wrapper.props();

          expect(props.lowResSize).toEqual(100);
          expect(props.highResSize).toEqual(null);
        };

        const isHighQuality = wrapper => {
          const props = wrapper.props();

          expect(props.lowResSize).toEqual(100);
          expect(props.highResSize).toEqual(660);
        };

        component.update();

        component.find("TimesImage").forEach((wrapper, indx) => {
          if (indx === 0) {
            return isLowQuality(wrapper);
          }

          return isHighQuality(wrapper);
        });
      }
    },
    {
      name: "should render a poor quality image if window does not exist",
      async test() {
        // eslint-disable-next-line prefer-destructuring
        const window = global.window;
        delete global.window;

        const { highResSize, lowResSize } = shallow(
          <ArticleList {...articleListProps} />
        )
          .dive()
          .dive()
          .find("ErrorView")
          .first()
          .dive()
          .find("WithTrackEvents(ArticleListItem)")
          .dive()
          .props();

        global.window = window;

        expect(lowResSize).toEqual(100);
        expect(highResSize).toEqual(null);
      }
    },
    {
      name: "should not work if there are no pending items",
      async test() {
        window.IntersectionObserver = FakeIntersectionObserver;

        const spy = jest.spyOn(ArticleList.prototype, "setState");

        mount(
          <ArticleList {...articleListProps} articles={articleListFixture} />
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

        window.IntersectionObserver.dispatchEntriesForInstance(
          1,
          makeNewEntries
        );

        await delay(100);

        // No work was done
        expect(spy).not.toHaveBeenCalled();

        spy.mockRestore();
      }
    },
    {
      name: "should not set state after unmounting",
      async test() {
        window.IntersectionObserver = FakeIntersectionObserver;

        const setStateSpy = jest.spyOn(ArticleList.prototype, "setState");

        const component = mount(
          <ArticleList
            {...articleListProps}
            articles={articleListFixture.slice(0, 1)}
            count={1}
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

        window.IntersectionObserver.dispatchEntriesForInstance(
          1,
          makeNewEntries
        );

        await delay(0);

        component.unmount();

        await delay(100);

        expect(setStateSpy.mock.calls.length).toBe(0);

        setStateSpy.mockRestore();
      }
    },
    {
      name: "should disconnect from the IntersectionObserver when unmounting",
      async test() {
        window.IntersectionObserver = FakeIntersectionObserver;

        const disconnectSpy = jest.spyOn(
          window.IntersectionObserver.prototype,
          "disconnect"
        );

        const component = mount(
          <ArticleList
            {...articleListProps}
            articles={articleListFixture.slice(0, 1)}
            count={1}
          />
        );

        component.unmount();

        expect(disconnectSpy).toHaveBeenCalled();

        disconnectSpy.mockRestore();
      }
    },
    {
      name: "should not throw when unmounting with no IntersectionObserver",
      async test() {
        delete window.IntersectionObserver;

        const component = mount(
          <ArticleList
            {...articleListProps}
            articles={articleListFixture.slice(0, 1)}
            count={1}
          />
        );

        expect(component.unmount.bind(component)).not.toThrow();
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
      }
    }
  ];

  iterator(tests);
};
