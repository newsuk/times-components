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
    const { boxes, receiveChildList } = this.props;
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    receiveChildList(boxes);
  }

  onViewableItemsChanged(info) {
    const { boxes, onViewed } = this.props;
    if (info.changed) {
      info.changed
        .filter(viewableItem => viewableItem.isViewable)
        .map(viewableItem => onViewed(viewableItem.item, boxes));
    }
  }

  render() {
    const { boxes } = this.props;
    return (
      <FlatList
        data={boxes}
        keyExtractor={({ id }) => id}
        onViewableItemsChanged={this.onViewableItemsChanged}
        renderItem={({ item }) => (
          <Text id={`box-${item.id}`}>Item {item.id}</Text>
        )}
        viewabilityConfig={viewabilityConfig}
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
