import React, { Component } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import memoize from "lodash.memoize";
import { contain } from "intrinsic-scale";
import {
  addMissingProtocol,
  normaliseWidthForAssetRequestCache,
  convertToPixels
} from "@times-components/utils";
import LazyLoadingImage from "./lazy-loading-image/lazy-loading-image";
import appendToUrl from "./utils";
import { defaultProps, propTypes } from "./image-prop-types";
import Placeholder from "./placeholder";
import styles from "./styles";

const getUriAtRes = memoize(
  (uri, resInPoints) => {
    const isDataImageUri = uri && uri.indexOf("data:") > -1;
    const resInPixels = normaliseWidthForAssetRequestCache(
      convertToPixels(resInPoints)
    );

    return isDataImageUri
      ? uri
      : addMissingProtocol(appendToUrl(uri, "resize", resInPixels));
  },
  (a, b) => a + b
);

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: null
    };
    this.onImageLayout = this.onImageLayout.bind(this);
  }

  onImageLayout(evt) {
    const { aspectRatio, onImageLayout, onLayout } = this.props;
    const { layout } = evt.nativeEvent;
    const { height, width } = contain(
      layout.width,
      layout.height,
      layout.width,
      aspectRatio ? layout.width / aspectRatio : layout.height
    );

    this.setState({ dimensions: { height, width } });

    if (onLayout) {
      onLayout(evt);
    }

    if (onImageLayout) {
      onImageLayout({ height, width });
    }
  }

  getPlaceholderDimensions() {
    const aspectRatio = this.getAspectRatio();
    const { dimensions } = this.state;
    const { highResSize } = this.props;

    if (!highResSize && !dimensions) {
      return null;
    }

    const width = highResSize || dimensions.width;
    const height = width / aspectRatio;

    return { width, height };
  }

  getAspectRatio() {
    const { dimensions } = this.state;
    const { aspectRatio } = this.props;

    if (aspectRatio) {
      return aspectRatio;
    }

    if (dimensions) {
      return dimensions.width / dimensions.height;
    }

    return null;
  }

  render() {
    const {
      aspectRatio,
      highResSize,
      lowResSize,
      borderRadius,
      style,
      uri,
      rounded,
      ...defaultImageProps
    } = this.props;
    const dimensions = this.getPlaceholderDimensions(aspectRatio);
    const renderedRes = highResSize || (dimensions ? dimensions.width : null);
    const srcUri = getUriAtRes(uri, renderedRes);

    return (
      <View
        aspectRatio={aspectRatio}
        onLayout={this.onImageLayout}
        style={[styles.imageContainer, style]}
      >
        {lowResSize ? (
          <Image
            {...defaultImageProps}
            borderRadius={rounded ? renderedRes / 2 : borderRadius}
            source={{ uri: getUriAtRes(uri, lowResSize) }}
            style={styles.image}
          />
        ) : (
          <Placeholder dimensions={dimensions} />
        )}
        <LazyLoadingImage
          {...defaultImageProps}
          borderRadius={rounded ? renderedRes / 2 : borderRadius}
          source={srcUri && renderedRes ? { uri: srcUri } : null}
          style={styles.image}
        />
      </View>
    );
  }
}

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = {
  ...propTypes,
  onImageLayout: PropTypes.func,
  rounded: PropTypes.bool
};

export default TimesImage;
