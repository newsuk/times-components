import React, { Component } from "react";
import { Animated, View, Image } from "react-native";
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

const FADE_ANIM_DURATION = 300;

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
    this.fadeAnim = new Animated.Value(1);
  }

  componentWillUnmount() {
    clearTimeout(this.fadeAnimTimeout);
    this.fadeAnim.stopAnimation(() => {});
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

  handleLoad() {
    const { disablePlaceholder } = this.props;

    clearTimeout(this.fadeAnimTimeout);

    const done = () => {
      this.setState({ isLoaded: true });
    };

    if (disablePlaceholder) {
      this.fadeAnim.setValue(1);
      done();
    } else {
      Animated.timing(this.fadeAnim, {
        toValue: 0,
        duration: FADE_ANIM_DURATION,
        useNativeDriver: true
      }).start();

      this.fadeAnimTimeout = setTimeout(done, FADE_ANIM_DURATION);
    }
  }

  render() {
    const {
      aspectRatio,
      disablePlaceholder,
      highResSize,
      lowResSize,
      style,
      uri,
      rounded,
      relativeWidth,
      relativeHeight,
      relativeHorizontalOffset,
      relativeVerticalOffset,
      ...defaultImageProps
    } = this.props;
    const { isLoaded, width } = this.state;
    const renderedRes = highResSize || width;
    const srcUri = getUriAtRes(uri, renderedRes);
    const lowResUri = lowResSize
      ? getUriAtRes(uri, Math.min(lowResSize, renderedRes))
      : null;
    const radius = width ? width / 2 : 9999;
    const borderRadius = rounded ? radius : 0;
    const placeholder = disablePlaceholder ? null : (
      <Placeholder borderRadius={borderRadius} />
    );

    return (
      <View
        aspectRatio={aspectRatio}
        onLayout={this.onImageLayout}
        style={[styles.imageContainer, style]}
      >
        <View style={[styles.roundContainer, { borderRadius }]}>
          <LazyLoadingImage
            {...defaultImageProps}
            relativeWidth={relativeWidth}
            relativeHeight={relativeHeight}
            relativeHorizontalOffset={relativeHorizontalOffset}
            relativeVerticalOffset={relativeVerticalOffset}
            fadeDuration={0}
            onLoad={this.handleLoad}
            source={srcUri && renderedRes ? { uri: srcUri } : null}
            style={styles.image}
          />
        </View>
        {isLoaded ? null : (
          <Animated.View
            collapsable={false}
            style={{ width: "100%", height: "100%", opacity: this.fadeAnim }}
          >
            {lowResSize ? (
              <View style={[styles.roundContainer, { borderRadius }]}>
                <Image
                  {...defaultImageProps}
                  fadeDuration={0}
                  source={{ uri: lowResUri }}
                  style={styles.image}
                />
              </View>
            ) : (
              placeholder
            )}
          </Animated.View>
        )}
      </View>
    );
  }
}

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
