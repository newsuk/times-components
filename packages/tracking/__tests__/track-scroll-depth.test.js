import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import { withTrackScrollDepth } from "../tracking";
import withTestContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";
import ListComponent from "./list-component";

Enzyme.configure({ adapter: new React16Adapter() });

describe("WithTrackScrollDepth", () => {
  it("tracks child views", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackScrollDepth(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items
      }),
      { trackingObject: "TestObject" }
    );

    renderer.create(
      <ListWithChildTracking
        analyticsStream={reporter}
        onViewed={() => {}}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" },
          { someKey: "3", someValue: "three" }
        ]}
      />
    );

    expect(reporter.mock.calls).toMatchSnapshot();
  });

  it("accepts component name override", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackScrollDepth(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items,
        trackingName: "SomeItem"
      })
    );

    const tracking = shallow(
      <ListWithChildTracking
        onViewed={() => {}}
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" },
          { someKey: "3", someValue: "three" }
        ]}
      />,
      {
        context: {
          tracking: {
            analytics: reporter
          }
        }
      }
    );
    tracking
      .dive()
      .dive()
      .instance()
      .onViewableItemsChanged.call(tracking.instance(), {
        info: {
          changed: [
            {
              isViewable: true,
              id: "one",
              someKey: "1",
              someValue: "one"
            }
          ]
        }
      });

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        component: "SomeItemChild"
      })
    );
  });

  it("accepts action name override", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackScrollDepth(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items,
        actionName: "Scrolled"
      })
    );

    const tracking = shallow(
      <ListWithChildTracking
        onViewed={() => {}}
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" },
          { someKey: "3", someValue: "three" }
        ]}
      />,
      {
        context: {
          tracking: {
            analytics: reporter
          }
        }
      }
    );
    tracking
      .dive()
      .dive()
      .instance()
      .onViewableItemsChanged.call(tracking.instance(), {
        info: {
          changed: [
            {
              isViewable: true,
              id: "one",
              someKey: "1",
              someValue: "one"
            }
          ]
        }
      });
    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "Scrolled"
      })
    );
  });

  it("applies tracking attrs", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackScrollDepth(ListComponent, {
        childIdPropKey: "someKey",
        getChildren: props => props.items,
        getAttrs: props => ({
          id: props.someKey,
          index: props.index,
          total: props.total
        })
      })
    );

    const tracking = shallow(
      <ListWithChildTracking
        onViewed={() => {}}
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" },
          { someKey: "3", someValue: "three" }
        ]}
      />,
      {
        context: {
          tracking: {
            analytics: reporter
          }
        }
      }
    );

    tracking
      .dive()
      .dive()
      .instance()
      .onViewableItemsChanged.call(tracking.instance(), {
        info: {
          changed: [
            {
              isViewable: true,
              id: "one",
              someKey: "1",
              someValue: "one"
            }
          ]
        }
      });
    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        attrs: expect.objectContaining({ id: "1", index: 0, total: 3 })
      })
    );
  });

  it("can track scroll events", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackScrollDepth(ListComponent, {
        childIdPropKey: "someKey",
        actionName: "Scrolled",
        getChildren: props => props.items,
        getAttrs: props => ({ depth: (props.index + 1) / props.total * 100 })
      })
    );

    const tracking = shallow(
      <ListWithChildTracking
        onViewed={() => {}}
        analyticsStream={reporter}
        items={[
          { someKey: "1", someValue: "one" },
          { someKey: "2", someValue: "two" },
          { someKey: "3", someValue: "three" }
        ]}
      />,
      {
        context: {
          tracking: {
            analytics: reporter
          }
        }
      }
    );
    tracking
      .dive()
      .dive()
      .instance()
      .onViewableItemsChanged.call(tracking.instance(), {
        info: {
          changed: [
            {
              isViewable: true,
              id: "three",
              someKey: "3",
              someValue: "three"
            }
          ]
        }
      });
    expect(reporter).toHaveBeenLastCalledWith(
      expect.objectContaining({
        action: "Scrolled",
        attrs: expect.objectContaining({ depth: 100 })
      })
    );
  });

  sharedTrackingTests(withTrackScrollDepth);
});
