import React from "react";
import { View, Image } from "react-native";
import merge from "lodash.merge";
import defaultSource from "./assets/default.png";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const styles = this.props.style || {};

    this.state = {
      width: styles.width || 0,
      height: styles.height || 0
    };

    this._handleLayout = this._handleLayout.bind(this);
  }

  _handleLayout(event) {
    const setSize = (width, height) => {
      this.setState({
        width: containerWidth,
        height: containerWidth * height / width
      });
    };

    const containerWidth = event.nativeEvent.layout.width;

    const { getSize = Image.getSize } = this.props;
    const imageUri = (this.props.source && this.props.source.uri) || "";

    // the size for the default image must match the static image
    getSize(imageUri, setSize, () => setSize(800, 600));
  }

  render() {
    const styles = merge(this.props.style, {
      width: this.state.width,
      height: this.state.height
    });

    return (
      <View onLayout={this._handleLayout}>
        <Image {...this.props} defaultSource={defaultSource} style={styles} />
      </View>
    );
  }
}
