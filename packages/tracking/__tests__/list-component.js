import React, { Component } from "react";
import { Text } from "react-native";
import { TcFlatList } from "@times-components/utils";
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
    const { onViewed } = this.props;
    const filtered = info.changed.filter(item => item.isViewable);
    filtered.forEach(item => onViewed(item));
  }

  render() {
    const { items } = this.props;
    return (
      <TcFlatList
        data={items}
        initialNumToRender={items.length}
        renderItem={({ item }) => <Text>Item {item.someValue}</Text>}
      />
    );
  }
}

export { ListComponent as default };
