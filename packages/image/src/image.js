import React, { Component } from "react";
import { Image, View } from "react-native";
import { addMissingProtocol } from "@times-components/utils";
import appendSize from "./utils";
import { defaultProps, propTypes } from "./image-prop-types";
import Placeholder from "./placeholder";
import styles from "./styles";

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { aspectRatio, highResSize, style, uri } = this.props;
    const { isLoaded } = this.state;

    const isDataImageUri = uri && uri.indexOf("data:") > -1;

    const srcUri = isDataImageUri
      ? uri
      : addMissingProtocol(appendSize(uri, "resize", highResSize));

    const props = {
      onLoad: this.handleLoad,
      source: srcUri
        ? {
            uri: srcUri
          }
        : null,
      style: styles.imageBackground
    };

    return (
      <View aspectRatio={aspectRatio} style={style}>
        {isLoaded ? null : <Placeholder />}
        <Image {...props} />
      </View>
    );
  }
}

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
