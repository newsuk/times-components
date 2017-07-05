import React from "react";
import { View, Image } from "react-native";
import merge from "lodash.merge";
import placeholder from "./placeholder";

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

    // the failure callback is ignored on mobile
    // https://github.com/necolas/react-native-web/blob/master/src/modules/ImageLoader/index.js#L25
    setSize(placeholder.width, placeholder.height);
    getSize(imageUri, setSize);
  }

  render() {
    const styles = merge(this.props.style, {
      width: this.state.width,
      height: this.state.height
    });

    return (
      <View onLayout={this._handleLayout}>
        <Image {...this.props} defaultSource={placeholder} style={styles} />
      </View>
    );
  }
}
