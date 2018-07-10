import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { withTrackScrollDepth } from "../src/tracking";
import withTestContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";
import ListComponent from "./list-component";

const items = [
  { someKey: "1", someValue: "one", elementId: "1" },
  { someKey: "2", someValue: "two", elementId: "2" },
  { someKey: "3", someValue: "three", elementId: "3" }
];

module.exports = () => {
  describe("WithTrackScrollDepth", () => {
    it("tracks scroll depth", () => {
      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent),
        { trackingObjectName: "TestObject" }
      );

      renderer.create(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={items}
          onViewed={() => {}}
        />
      );

      expect(reporter.mock.calls).toMatchSnapshot();
    });

    it("tracks scroll depth only for unseen children", () => {
      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent),
        { trackingObjectName: "TestObject" }
      );

      const tracking = shallow(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={items}
          onViewed={() => {}}
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
                elementId: 1
              },
              {
                isViewable: true,
                elementId: 1
              }
            ]
          }
        });

      expect(reporter.mock.calls).toMatchSnapshot();
    });

    it("accepts component name override", () => {
      const reporter = jest.fn();
      const ListWithChildTracking = withTestContext(
        withTrackScrollDepth(ListComponent, {
          trackingName: "SomeItem"
        })
      );

      const tracking = shallow(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={items}
          onViewed={() => {}}
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
          actionName: "Scrolled"
        })
      );

      const tracking = shallow(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={items}
          onViewed={() => {}}
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
          getAttrs: props => ({
            id: props.someKey,
            myKey: "myVal"
          })
        })
      );

      const tracking = shallow(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={items}
          onViewed={() => {}}
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
        withTrackScrollDepth(ListComponent, {
          getAttrs: () => {}
        })
      );

      const tracking = shallow(
        <ListWithChildTracking
          analyticsStream={reporter}
          items={items}
          onViewed={() => {}}
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
                elementId: "3",
                someKey: "3",
                someValue: "three"
              }
            ]
          }
        });
      expect(reporter).toHaveBeenLastCalledWith(
        expect.objectContaining({
          attrs: expect.objectContaining({
            scrollDepth: { itemNumber: 3, total: 3 }
          })
        })
      );
    });

    sharedTrackingTests(withTrackScrollDepth);
  });
};
