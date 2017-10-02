import React from "react";
import { Image } from "react-native";
import placeholder from "./placeholder";
import mapPropsToState from "./props-to-state";

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = mapPropsToState(props);
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
          height: this.state.height || "inherit",
          width: this.state.width || "inherit"
        },
        this.props.style
      ]
    });

    return (
      <Image
        {...props}
        onLayout={this.handleLayout}
        onError={this.handleError}
        onLoad={this.handleLoad}
      />
    );
  }
}

ImageComponent.propTypes = Image.propTypes;

export default ImageComponent;
