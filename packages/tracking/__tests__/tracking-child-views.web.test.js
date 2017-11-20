import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import { withTrackChildViews } from "../tracking";
import withTestContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";

class FakeIntersectionObserver {
  static clearObservering() {
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
    this.constructor.clearObservering();
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
      getChildList: PropTypes.func
    };
  }
  static get defaultProps() {
    return {
      items: [{ someKey: "1", someValue: "one" }],
      getChildList: () => {}
    };
  }
  static get someStatic() {
    return { foo: "bar" };
  }
  constructor(props) {
    super(props);
    props.getChildList(props.items);
  }
  render() {
    return (
      <View>
        {this.props.items.map(item => (
          <Text key={item.someKey}>Item {item.someValue}</Text>
        ))}
      </View>
    );
  }
}

describe("WithTrackChildViews", () => {
  let realGetElementById;

  beforeEach(() => {
    global.window.IntersectionObserver = FakeIntersectionObserver;

    realGetElementById = global.window.document.getElementById;
    global.window.document.getElementById = stubGetElementById;
  });

  afterEach(() => {
    delete global.window.IntersectionObserver;

    global.window.document.getElementById = realGetElementById;

    FakeIntersectionObserver.clearObservering();
  });

  it("tracks child views", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey"
      }),
      { trackingObject: "TestObject" }
    );

    renderer.create(
      <ListWithChildTracking
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" },
          { someKey: "3", someValue: "three" }
        ]}
      />
    );

    FakeIntersectionObserver.dispatchObservedAll();

    expect(reporter.mock.calls).toMatchSnapshot();
  });

  it("accepts component name override", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        trackingName: "SomeItem"
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
        component: "SomeItemChild"
      })
    );
  });

  it("accepts action name override", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        actionName: "Scrolled"
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
        action: "Scrolled"
      })
    );
  });

  it("applies tracking attrs", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        getAttrs: props => ({
          id: props.someKey,
          index: props.index,
          total: props.total
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
          scrollDepth: {
            index: 1,
            total: 1
          }
        })
      })
    );
  });

  it("can track scroll events", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        actionName: "Scrolled",
        getAttrs: props => ({ depth: (props.index + 1) / props.total * 100 })
      })
    );

    renderer.create(
      <ListWithChildTracking
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" }
        ]}
      />
    );

    FakeIntersectionObserver.dispatchObservedAll();

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "Scrolled",
        attrs: expect.objectContaining({ depth: 50 })
      })
    );
  });

  it("cleans-up on unmount", () => {
    const disconnectSpy = jest.spyOn(
      global.window.IntersectionObserver.prototype,
      "disconnect"
    );

    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items
      })
    );

    renderer
      .create(<ListWithChildTracking analyticsStream={() => {}} items={[]} />)
      .unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  sharedTrackingTests(withTrackChildViews);
});
