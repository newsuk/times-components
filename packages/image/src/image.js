import React, { Component } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import memoize from "lodash.memoize";
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
      width: null
    };
    this.onImageLayout = this.onImageLayout.bind(this);
  }

  onImageLayout(evt) {
    const { onLayout } = this.props;

    this.setState({
      width: evt.nativeEvent.layout.width
    });

    if (onLayout) {
      onLayout(evt);
    }
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
    const { width } = this.state;
    const renderedRes = highResSize || width;
    const srcUri = getUriAtRes(uri, renderedRes);
    const lowResUri = lowResSize
      ? getUriAtRes(uri, Math.min(lowResSize, renderedRes))
      : null;
    const showLowResPlaceholder = lowResSize && lowResUri !== srcUri;

    return (
      <View
        aspectRatio={aspectRatio}
        onLayout={this.onImageLayout}
        style={[styles.imageContainer, style]}
      >
        {!lowResSize ? <Placeholder size={renderedRes} /> : null}
        {showLowResPlaceholder ? (
          <Image
            {...defaultImageProps}
            borderRadius={rounded ? renderedRes / 2 : borderRadius}
            fadeDuration={0}
            source={{
              uri: lowResUri
            }}
            style={styles.image}
          />
        ) : null}
        <LazyLoadingImage
          {...defaultImageProps}
          borderRadius={rounded ? renderedRes / 2 : borderRadius}
          fadeDuration={0}
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
  rounded: PropTypes.bool
};

export default TimesImage;
