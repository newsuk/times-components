import React, { Component, Fragment } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import memoize from "lodash.memoize";
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
      isLoaded: false,
      width: null
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.onImageLayout = this.onImageLayout.bind(this);
  }

  onImageLayout(evt) {
    const { onLayout } = this.props;

    this.setState({ width: evt.nativeEvent.layout.width });

    if (onLayout) {
      onLayout(evt);
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
      style,
      uri
    } = this.props;
    const { isLoaded, width } = this.state;
    const renderedRes = highResSize || width;
    const srcUri = getUriAtRes(uri, renderedRes);

    return (
      <View
        aspectRatio={aspectRatio}
        onLayout={this.onImageLayout}
        style={style}
      >
        {isLoaded ? null : (
          <Fragment>
            <Placeholder />
            {lowResSize ? (
              <Image
                borderRadius={borderRadius}
                source={{ uri: getUriAtRes(uri, lowResSize) }}
                style={styles.imageBackground}
              />
            ) : null}
          </Fragment>
        )}
        <LazyLoadingImage
          borderRadius={borderRadius}
          onLoad={this.handleLoad}
          source={srcUri && renderedRes ? { uri: srcUri } : null}
          style={styles.imageBackground}
        />
      </View>
    );
  }
}

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = {
  ...propTypes,
  onLayout: PropTypes.func
};

export default TimesImage;
