import React, { Component } from "react";
import { Text, FlatList } from "react-native";
import PropTypes from "prop-types";

class ListComponent extends Component {
  static get propTypes() {
    return {
      items: PropTypes.arrayOf(
        PropTypes.shape({
          someKey: PropTypes.string,
          someValue: PropTypes.string
        })
      ),
      onViewed: PropTypes.func.isRequired,
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
  constructor(props, context) {
    super(props, context);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    props.receiveChildList(props.items);
  }
  onViewableItemsChanged({ info }) {
    const filtered = info.changed.filter(item => item.isViewable);
    filtered.forEach(item => this.props.onViewed(item));
  }
  render() {
    return (
      <FlatList
        data={this.props.items}
        initialNumToRender={this.props.items.length}
        keyExtractor={({ someKey }) => someKey}
        onViewableItemsChanged={this.onViewableItemsChanged}
        renderItem={({ item }) => <Text>Item {item.someValue}</Text>}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100,
          waitForInteraction: false
        }}
      />
    );
  }
}

export { ListComponent as default };
