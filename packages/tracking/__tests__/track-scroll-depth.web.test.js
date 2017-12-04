import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import { withTrackScrollDepth } from "../tracking";
import withTestContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";

class FakeIntersectionObserver {
  static clearObserving() {
    FakeIntersectionObserver.observing.splice(0);
  }
  static dispatchObservedAll() {
    this.observationCallback(
      this.observing.map(element => ({
        isIntersecting: true,
        intersectionRatio: 1,
        target: { id: element.id }
      }))
    );
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

class ListComponent extends React.Component {
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
  render() {
    return (
      <View>
        {this.props.items.map(item => (
          <Text key={item.someKey} id={item.elementId}>
            Item {item.someValue}
          </Text>
        ))}
      </View>
    );
  }
}

describe("WithTrackScrollDepth", () => {
  let realGetElementById;

  beforeEach(() => {
    global.window.IntersectionObserver = FakeIntersectionObserver;

    realGetElementById = global.window.document.getElementById;
    global.window.document.getElementById = stubGetElementById;
  });

  afterEach(() => {
    delete global.window.IntersectionObserver;

    global.window.document.getElementById = realGetElementById;

    FakeIntersectionObserver.clearObserving();
  });

  it("tracks scroll depth", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackScrollDepth(ListComponent),
      { trackingObject: "TestObject" }
    );

    renderer.create(
      <ListWithChildTracking
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one", elementId: 1 },
          { someKey: "2", someValue: "two", elementId: 2 },
          { someKey: "3", someValue: "three", elementId: 3 }
        ]}
      />
    );

    FakeIntersectionObserver.dispatchObservedAll();

    expect(reporter.mock.calls).toMatchSnapshot();
  });

  it("accepts component name override", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackScrollDepth(ListComponent, {
        trackingName: "SomeItem"
      })
    );

    renderer.create(
      <ListWithChildTracking
        analyticsStream={reporter}
        items={[{ someKey: "1", someValue: "one", elementId: 1 }]}
      />
    );

    FakeIntersectionObserver.dispatchObservedAll();

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        component: "SomeItemChild"
      })
    );
  });

  it("applies tracking attrs", () => {
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

  it("emits events including scroll depth", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackScrollDepth(ListComponent)
    );

    renderer.create(
      <ListWithChildTracking
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one", elementId: 1 },
          { someKey: "2", someValue: "two", elementId: 2 }
        ]}
      />
    );

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

    expect(disconnectSpy).toHaveBeenCalled();
  });

  sharedTrackingTests(withTrackScrollDepth);
});
