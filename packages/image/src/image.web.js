import React, { Component } from "react";
import { View } from "react-native";
import { addMissingProtocol } from "@times-components/utils";
import Placeholder from "./placeholder";
import { defaultProps, propTypes } from "./image-prop-types";
import appendToURL from "./utils";
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
  }

  onHighResTransitionEnd() {
    this.setState({
      highResIsVisible: true
    });
  }

  handleHighResOnLoad() {
    this.setState({
      highResIsLoaded: true,
      imageIsLoaded: true
    });
  }

  handleLowResOnLoad() {
    this.setState({
      imageIsLoaded: true,
      lowResIsLoaded: true
    });
  }

  highResImage({ highResSize, lowResSize, url }) {
    const { highResIsLoaded } = this.state;
    if (!lowResSize || highResSize) {
      return (
        <StyledImage
          alt=""
          isLoaded={highResIsLoaded}
          onLoad={this.handleHighResOnLoad}
          onTransitionEnd={this.onHighResTransitionEnd}
          src={appendToURL(url, "resize", highResSize)}
          zIndex={2}
        />
      );
    }

    return null;
  }

  lowResImage({ lowResSize, url }) {
    const { highResIsVisible, lowResIsLoaded } = this.state;
    if (lowResSize && !highResIsVisible) {
      return (
        <StyledImage
          alt=""
          isLoaded={lowResIsLoaded}
          onLoad={this.handleLowResOnLoad}
          src={appendToURL(url, "resize", lowResSize)}
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
          {this.lowResImage({ lowResSize, url })}
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
