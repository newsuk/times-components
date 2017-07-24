import React from "react";
import { Dimensions, Image, View } from "react-native";
import placeholder from "./placeholder";

const window = Dimensions.get('window');

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: props.source,
      width: window.width,
      height: 1
    };

    if (props.source.uri.indexOf("//") === 0) {
      this.state.source.uri = `https:${  props.source.uri}`;
    }

    this.getSize = Image.getSize;
    this.handleError = this.handleError.bind(this);
    this.handleLayout = this.handleLayout.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  calculateDimensions(props) {
    const state = Object.assign({}, this.state, props);
    if (!state.layout) {
      return this.setState(props);
    }

    return this.setState(
      Object.assign(state, {
        width: state.layout.width,
        height: state.layout.width * state.height / state.width
      })
    );
  }

  handleError() {
    this.calculateDimensions({
      source: {
        uri: placeholder
      },
      width: 800,
      height: 600
    });
  }

  handleLoad() {
    return this.getSize(this.state.source.uri, (width, height) =>
      this.calculateDimensions({
        width,
        height
      })
    );
  }

  handleLayout({ nativeEvent }) {
    const { height, width } = nativeEvent.layout;

    this.calculateDimensions({
      layout: {
        width,
        height
      }
    });
  }

  render() {
    const props = Object.assign({}, this.props, {
      source: this.state.source,
      style: [
        {
          height: this.state.height,
          width: this.state.width
        },
        this.props.style
      ]
    });

    return (
      <View onLayout={this.handleLayout}>
        <Image {...props} onError={this.handleError} onLoad={this.handleLoad} />
      </View>
    );
  }
}

ImageComponent.propTypes = Image.propTypes;

export default ImageComponent;
