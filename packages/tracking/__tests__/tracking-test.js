import React, { Component } from "react";
import { TcView, TcText } from "@times-components/utils";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { withTrackScrollDepth } from "../src/tracking";
import withTestContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";

class FakeIntersectionObserver {
  static clearObserving() {
    FakeIntersectionObserver.observing.splice(0);
  }

  static dispatchObservedAll() {
    this.observationCallback(
      this.observing.map(element => ({
        intersectionRatio: 1,
        isIntersecting: true,
        target: {
          id: element.id
        }
      }))
    );
  }

  static dispatchObservedAllAsUndefined() {
    this.observationCallback();
  }

  constructor(callback) {
    this.constructor.observationCallback = callback;
  }

  observe(element) {
    this.constructor.observing.push(element);
  }

  disconnect() {
    this.constructor.clearObserving();
  }
}
FakeIntersectionObserver.observing = [];

const stubGetElementById = id => ({ id });

class ListComponent extends Component {
  static get propTypes() {
    return {
      items: PropTypes.arrayOf(
        PropTypes.shape({
          someKey: PropTypes.string,
          someValue: PropTypes.string
        })
      ),
      receiveChildList: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      items: [{ someKey: "1", someValue: "one" }],
      receiveChildList: () => {}
    };
  }

  static get someStatic() {
    return { foo: "bar" };
  }

  constructor(props) {
    super(props);
    props.receiveChildList(props.items);
  }

  componentDidUpdate() {
    const { items, receiveChildList } = this.props;
    receiveChildList(items);
  }

  render() {
    const { items } = this.props;
    return (
      <TcView>
        {items.map(item => (
          <TcText id={item.elementId} key={item.someKey}>
            Item {item.someValue}
          </TcText>
        ))}
      </TcView>
    );
  }
}

module.exports = () => {
  describe("WithTrackScrollDepth", () => {
    let realGetElementById;
    let eventMap;

    beforeEach(() => {
      global.window.IntersectionObserver = FakeIntersectionObserver;

      realGetElementById = global.window.document.getElementById;
      global.window.document.getElementById = stubGetElementById;
      eventMap = {};

      global.window.addEventListener = jest.fn((eventName, callback) => {
        eventMap[eventName] = callback;
      });

      global.window.removeEventListener = jest.fn(eventName => {
        delete eventMap[eventName];
      });
    });

    afterEach(() => {
      delete global.window.IntersectionObserver;

      global.window.document.getElementById = realGetElementById;

      FakeIntersectionObserver.clearObserving();

      global.window.addEventListener = global.window.addEventListener;
      global.window.removeEventListener = global.window.removeEventListener;
    });

    it("does not tracks scroll depth without scroll", () => {
      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent),
        { trackingObjectName: "TestObject" }
      );

      renderer.create(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={[
            {
              elementId: 1,
              name: "name1",
              someKey: "1",
              someValue: "one"
            },
            {
              elementId: 2,
              name: "name2",
              someKey: "2",
              someValue: "two"
            },
            {
              elementId: 3,
              name: "name3",
              someKey: "3",
              someValue: "three"
            }
          ]}
        />
      );

      FakeIntersectionObserver.dispatchObservedAll();

      expect(reporter.mock.calls).toMatchSnapshot();
    });

    it("tracks scroll depth after update", async () => {
      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent),
        { trackingObjectName: "TestObject" }
      );

      const items = [
        {
          elementId: 1,
          name: "name1",
          someKey: "1",
          someValue: "one"
        },
        {
          elementId: 2,
          name: "name2",
          someKey: "2",
          someValue: "two"
        },
        {
          elementId: 3,
          name: "name3",
          someKey: "3",
          someValue: "three"
        }
      ];

      const component = mount(
        <ListWithChildTracking analyticsStream={reporter} items={items} />
      );

      eventMap.scroll();

      FakeIntersectionObserver.dispatchObservedAll();

      component.setProps({
        items: [
          ...items,
          {
            elementId: 4,
            name: "name4",
            someKey: "4",
            someValue: "four"
          }
        ]
      });

      FakeIntersectionObserver.dispatchObservedAll();

      expect(reporter.mock.calls).toMatchSnapshot();
    });

    it("accepts component name override", async () => {
      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent, {
          trackingName: "SomeItem"
        })
      );

      renderer.create(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={[
            {
              elementId: 1,
              someKey: "1",
              someValue: "one"
            }
          ]}
        />
      );

      eventMap.scroll();

      FakeIntersectionObserver.dispatchObservedAll();

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          component: "SomeItemChild"
        })
      );
    });

    it("applies tracking attrs", async () => {
      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent, {
          getAttrs: props => ({
            id: props.someKey,
            myKey: "myVal"
          })
        })
      );

      renderer.create(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={[{ someKey: "1", someValue: "one" }]}
        />
      );

      eventMap.scroll();

      FakeIntersectionObserver.dispatchObservedAll();

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          attrs: expect.objectContaining({
            id: "1",
            myKey: "myVal"
          })
        })
      );
    });

    it("emits events including scroll depth", async () => {
      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent)
      );

      renderer.create(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={[
            {
              elementId: 1,
              someKey: "1",
              someValue: "one"
            },
            {
              elementId: 2,
              someKey: "2",
              someValue: "two"
            }
          ]}
        />
      );

      eventMap.scroll();

      FakeIntersectionObserver.dispatchObservedAll();

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          attrs: expect.objectContaining({
            scrollDepth: { itemNumber: 2, total: 2 }
          })
        })
      );
    });

    it("cleans-up on unmount", () => {
      const disconnectSpy = jest.spyOn(
        global.window.IntersectionObserver.prototype,
        "disconnect"
      );

      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent)
      );

      renderer
        .create(<ListWithChildTracking analyticsStream={() => {}} items={[]} />)
        .unmount();

      expect(eventMap).toEqual({});
      expect(disconnectSpy).toHaveBeenCalled();
    });

    it("does not throw with no observer on unmount", () => {
      const IO = global.window.IntersectionObserver;

      delete global.window.IntersectionObserver;

      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent)
      );

      const renderComponent = () =>
        renderer
          .create(
            <ListWithChildTracking analyticsStream={() => {}} items={[]} />
          )
          .unmount();

      expect(renderComponent).not.toThrow();

      global.window.IntersectionObserver = IO;
    });

    it("does not throw if IntersectionObserver is not available", () => {
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent)
      );

      const IO = global.window.IntersectionObserver;

      delete global.window.IntersectionObserver;

      const renderComponent = () =>
        renderer.create(
          <ListWithChildTracking analyticsStream={() => {}} items={[]} />
        );

      expect(renderComponent).not.toThrow();

      global.window.IntersectionObserver = IO;
    });

    it("does not throw if there is no context", () => {
      const ListWithChildTracking = withTrackScrollDepth(ListComponent);

      const renderComponent = () => {
        renderer.create(
          <ListWithChildTracking
            analyticsStream={() => {}}
            items={[
              {
                elementId: 1,
                someKey: "1",
                someValue: "one"
              },
              {
                elementId: 2,
                someKey: "2",
                someValue: "two"
              }
            ]}
          />
        );

        FakeIntersectionObserver.dispatchObservedAll();
      };

      expect(renderComponent).not.toThrow();
    });

    it("does not throw if there is nothing to observe", () => {
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent)
      );

      const renderComponent = () => {
        renderer.create(
          <ListWithChildTracking
            analyticsStream={() => {}}
            items={[
              {
                elementId: 1,
                someKey: "1",
                someValue: "one"
              },
              {
                elementId: 2,
                someKey: "2",
                someValue: "two"
              }
            ]}
          />
        );

        FakeIntersectionObserver.dispatchObservedAllAsUndefined();
      };

      expect(renderComponent).not.toThrow();
    });

    it("does not report missing elements", () => {
      global.window.document.getElementById = () => null;

      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent),
        { trackingObjectName: "TestObject" }
      );

      renderer.create(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={[
            {
              elementId: 1,
              someKey: "1",
              someValue: "one"
            },
            {
              elementId: 2,
              someKey: "2",
              someValue: "two"
            },
            {
              elementId: 3,
              someKey: "3",
              someValue: "three"
            }
          ]}
        />
      );

      FakeIntersectionObserver.dispatchObservedAll();

      expect(reporter.mock.calls).toMatchSnapshot();
    });

    sharedTrackingTests(withTrackScrollDepth);
  });
};
