import React from "react";
import PropTypes from "prop-types";
import { Text, FlatList } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { withTrackingContext, withTrackScrollDepth } from "./tracking";

const storybookReporter = action("analytics-event");

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

class Boxes extends React.Component {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    this.props.receiveChildList(this.props.boxes);
  }
  onViewableItemsChanged(info) {
    if (info.changed) {
      info.changed
        .filter(viewableItem => viewableItem.isViewable)
        .map(viewableItem =>
          this.props.onViewed(viewableItem.item, this.props.boxes)
        );
    }
  }
  render() {
    return (
      <FlatList
        data={this.props.boxes}
        renderItem={({ item }) => (
          <Text id={`box-${item.id}`}>Item {item.id}</Text>
        )}
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={({ id }) => id}
      />
    );
  }
}
Boxes.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onViewed: PropTypes.func,
  receiveChildList: PropTypes.func
};
Boxes.defaultProps = {
  onViewed: () => {},
  receiveChildList: () => {}
};

storiesOf("Tracking", module).add("Scroll depth tracking", () => {
  const boxes = [...Array(50).keys()].map(i => ({
    id: `box-${i + 1}`,
    color: i % 2 === 0 ? "green" : "blue"
  }));
  const BoxesWithTrackingContext = withTrackingContext(
    withTrackScrollDepth(Boxes, {
      childIdPropKey: "id",
      actionName: "Scrolled",
      getAttrs: props => ({
        id: props.id
      })
    }),
    { trackingObject: "Story" }
  );
  return (
    <BoxesWithTrackingContext
      onViewed={() => {}}
      boxes={boxes}
      analyticsStream={storybookReporter}
    />
  );
});
