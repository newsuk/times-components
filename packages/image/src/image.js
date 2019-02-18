import React, { Component } from "react";
import { View } from "react-native";
import {
  addMissingProtocol,
  normaliseWidthForAssetRequestCache,
  convertToPixels
} from "@times-components/utils";
import LazyLoadingImage from "./lazy-loading-image";
import appendToUrl from "./utils";
import { defaultProps, propTypes } from "./image-prop-types";
import Placeholder from "./placeholder";
import styles from "./styles";

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageRes: null,
      isLoaded: false
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.onImageLayout = this.onImageLayout.bind(this);
  }

  onImageLayout({
    nativeEvent: {
      layout: { width }
    }
  }) {
    const { highResSize } = this.props;
    const imageRes = normaliseWidthForAssetRequestCache(
      convertToPixels(highResSize ? Math.min(width, highResSize) : width)
    );

    this.setState({ imageRes });
  }

  handleLoad() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { aspectRatio, borderRadius, style, uri } = this.props;
    const { isLoaded, imageRes } = this.state;

    const isDataImageUri = uri && uri.indexOf("data:") > -1;

    const srcUri = isDataImageUri
      ? uri
      : addMissingProtocol(appendToUrl(uri, "resize", imageRes));

    const props = {
      borderRadius,
      onLoad: this.handleLoad,
      source:
        srcUri && imageRes
          ? {
              uri: srcUri
            }
          : null,
      style: styles.imageBackground
    };

    return (
      <View
        aspectRatio={aspectRatio}
        onLayout={this.onImageLayout}
        style={style}
      >
        {isLoaded ? null : <Placeholder />}
        <LazyLoadingImage {...props} />
      </View>
    );
  }
}

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
