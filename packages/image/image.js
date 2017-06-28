import React from "react";
import { View, Image } from "react-native";
import merge from "lodash.merge";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const styles = this.props.style || {};

    this.state = {
      width: styles.width || 0,
      height: styles.height || 0
    };

    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;

    const { getSize = Image.getSize } = this.props;
    const imageUri = (this.props.source && this.props.source.uri) || '';

    getSize(imageUri, (width, height) => {
      this.setState({
        width: containerWidth,
        height: containerWidth * height / width
      });
    });
  }

  render() {
    const styles = merge(this.props.style, {
      width: this.state.width,
      height: this.state.height
    });

    return (
      <View onLayout={this.handleLayout}>
        <Image
          style={styles}
          {...this.props}
        />
      </View>
    );
  }
}
