import { Text, FlatList } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import { withTrackChildViews } from "../tracking";
import withTestContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";

Enzyme.configure({ adapter: new React16Adapter() });

class ListComponent extends React.Component {
  static get propTypes() {
    return {
      onViewed: PropTypes.func.isRequired,
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
  constructor(props, context) {
    super(props, context);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    props.getChildList(props.items);
  }
  onViewableItemsChanged({ info }) {
    const filtered = info.changed.filter(item => item.isViewable);
    filtered.forEach(item => this.props.onViewed(item));
  }
  render() {
    return (
      <FlatList
        data={this.props.items}
        renderItem={({ item }) => <Text>Item {item.someValue}</Text>}
        onViewableItemsChanged={this.onViewableItemsChanged}
        keyExtractor={({ someKey }) => someKey}
        initialNumToRender={this.props.items.length}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100,
          waitForInteraction: false
        }}
      />
    );
  }
}

export { ListComponent as default };

describe("WithTrackChildViews", () => {
  it("tracks child views", () => {
    const reporter = jest.fn();
    const ListWithChildTracking = withTestContext(
      withTrackChildViews(ListComponent, {
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
      withTrackChildViews(ListComponent, {
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
      withTrackChildViews(ListComponent, {
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
      withTrackChildViews(ListComponent, {
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
      withTrackChildViews(ListComponent, {
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

  sharedTrackingTests(withTrackChildViews);
});
