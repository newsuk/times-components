import React, { Fragment, Component } from "react";
import { View, Image } from "react-native";
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
    const { highResSize, onImageUriCalculate } = this.props;
    const imageRes = normaliseWidthForAssetRequestCache(
      convertToPixels(highResSize ? Math.min(width, highResSize) : width)
    );

    this.setState({ imageRes });

    if (onImageUriCalculate) {
      onImageUriCalculate({ uri: this.getImageUriForRes(imageRes) });
    }
  }

  getImageUriForRes(imageRes) {
    const { uri } = this.props;
    const isDataImageUri = uri && uri.indexOf("data:") > -1;

    return isDataImageUri
      ? uri
      : addMissingProtocol(appendToUrl(uri, "resize", imageRes));
  }

  handleLoad() {
    this.setState({ isLoaded: true });
  }

  renderPlaceholderImage() {
    const { borderRadius, placeholderUri } = this.props;

    if (placeholderUri) {
      return (
        <Image
          borderRadius={borderRadius}
          source={{ uri: placeholderUri }}
          style={styles.imageBackground}
        />
      );
    }

    return null;
  }

  render() {
    const { aspectRatio, borderRadius, style } = this.props;
    const { isLoaded, imageRes } = this.state;
    const srcUri = this.getImageUriForRes(imageRes);

    return (
      <View
        aspectRatio={aspectRatio}
        onLayout={this.onImageLayout}
        style={style}
      >
        {isLoaded ? null : (
          <Fragment>
            <Placeholder />
            {this.renderPlaceholderImage()}
          </Fragment>
        )}
        <LazyLoadingImage
          borderRadius={borderRadius}
          onLoad={this.handleLoad}
          source={srcUri && imageRes ? { uri: srcUri } : null}
          style={styles.imageBackground}
        />
      </View>
    );
  }
}

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
