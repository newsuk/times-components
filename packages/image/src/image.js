import React, { Component, Fragment } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import memoize from "lodash.memoize";
import { contain } from "intrinsic-scale";
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
      dimensions: null,
      isLoaded: false
    };
    this.handleLoad = this.handleLoad.bind(this);
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

  handleLoad() {
    this.setState({ isLoaded: true });
  }

  render() {
    const {
      aspectRatio,
      borderRadius,
      highResSize,
      lowResSize,
      index,
      onImagePress,
      style,
      uri
    } = this.props;
    const { isLoaded, dimensions } = this.state;
    const renderedRes = highResSize || (dimensions ? dimensions.width : null);
    const srcUri = getUriAtRes(uri, renderedRes);

    return (
      <View
        aspectRatio={aspectRatio}
        onImagePress={() => onImagePress(index)}
        onLayout={this.onImageLayout}
        style={[styles.imageContainer, style]}
      >
        {isLoaded ? null : (
          <Fragment>
            <Placeholder dimensions={dimensions} />
            {lowResSize ? (
              <Image
                borderRadius={borderRadius}
                source={{ uri: getUriAtRes(uri, lowResSize) }}
                style={styles.image}
              />
            ) : null}
          </Fragment>
        )}
        <LazyLoadingImage
          borderRadius={borderRadius}
          onLoad={this.handleLoad}
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
  onImageLayout: PropTypes.func
};

export default TimesImage;
