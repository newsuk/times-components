import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, FlatList } from "react-native";

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

export default class Boxes extends Component {
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
