import React from "react";
import { View, Image } from "react-native";
import merge from "lodash/merge";

export default class extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleLayout = this.handleLayout.bind(this);
    this.state = { width: 0, height: 0 };
  }

  handleLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;

    Image.getSize(this.props.source.uri, (width, height) => {
      this.setState({
        width: containerWidth,
        height: containerWidth * height / width
      });
    });
  }

  render() {
    return (
      <View onLayout={this.handleLayout}>
        <Image
          {...this.props}
          style={merge(this.props.style || {}, {
            width: this.state.width,
            height: this.state.height
          })}
        />
      </View>
    );
  }
}
