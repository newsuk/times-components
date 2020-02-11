import React, { Component } from "react";
import { View } from "react-native";
import { addMissingProtocol, appendToImageURL } from "@times-components/utils";
import Placeholder from "./placeholder";
import { defaultProps, propTypes } from "./image-prop-types";
import styles from "./styles/index.web";
import StyledImage from "./styles/responsive";

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highResIsLoaded: false,
      highResIsVisible: false,
      imageIsLoaded: false,
      lowResIsLoaded: !props.fadeImageIn
    };

    this.handleHighResOnLoad = this.handleHighResOnLoad.bind(this);
    this.handleLowResOnLoad = this.handleLowResOnLoad.bind(this);
    this.onHighResTransitionEnd = this.onHighResTransitionEnd.bind(this);
    this.getLowResImage = this.getLowResImage.bind(this);
    this.getHighResImage = this.getHighResImage.bind(this);
  }

  onHighResTransitionEnd() {
    this.setState({
      highResIsVisible: true
    });
  }

  getHighResImage(img) {
    if (img && img.complete) {
      this.handleHighResOnLoad();
    }
  }

  getLowResImage(img) {
    if (img && img.complete) {
      this.handleLowResOnLoad();
    }
  }

  handleLowResOnLoad() {
    this.setState({
      imageIsLoaded: true,
      lowResIsLoaded: true
    });
  }

  handleHighResOnLoad() {
    this.setState({
      highResIsLoaded: true,
      imageIsLoaded: true
    });
  }

  highResImage({ highResSize, lowResSize, url }) {
    const { highResIsLoaded } = this.state;
    const { accessibilityLabel } = this.props;
    if (!lowResSize || highResSize) {
      return (
        <StyledImage
          alt={accessibilityLabel}
          ref={this.getHighResImage}
          isLoaded={highResIsLoaded}
          onLoad={this.handleHighResOnLoad}
          onTransitionEnd={this.onHighResTransitionEnd}
          src={appendToImageURL(url, "resize", highResSize)}
          zIndex={2}
        />
      );
    }

    return null;
  }

  lowResImage({ lowResQuality, lowResSize, url }) {
    const { highResIsVisible, lowResIsLoaded } = this.state;
    const { accessibilityLabel } = this.props;
    if (lowResSize && !highResIsVisible) {
      let imageSource = appendToImageURL(url, "resize", lowResSize);
      if (lowResQuality) {
        imageSource = appendToImageURL(imageSource, "quality", lowResQuality);
      }

      return (
        <StyledImage
          alt={accessibilityLabel}
          ref={this.getLowResImage}
          isLoaded={lowResIsLoaded}
          onLoad={this.handleLowResOnLoad}
          src={imageSource}
          zIndex={1}
        />
      );
    }

    return null;
  }

  render() {
    const {
      aspectRatio,
      disablePlaceholder,
      highResSize,
      lowResQuality,
      lowResSize,
      style,
      uri,
      onLayout,
      rounded
    } = this.props;
    const { imageIsLoaded } = this.state;
    const url = addMissingProtocol(uri);

    return (
      <View
        onLayout={onLayout}
        style={[style, rounded && { borderRadius: "50%", overflow: "hidden" }]}
      >
        <div
          style={{ ...styles.wrapper, paddingBottom: `${100 / aspectRatio}%` }}
        >
          {this.highResImage({ highResSize, lowResSize, url })}
          {this.lowResImage({ lowResQuality, lowResSize, url })}
          {disablePlaceholder || imageIsLoaded ? null : (
            <Placeholder borderRadius={rounded ? "50%" : 0} />
          )}
        </div>
      </View>
    );
  }
}

TimesImage.propTypes = propTypes;
TimesImage.defaultProps = defaultProps;

export default TimesImage;
