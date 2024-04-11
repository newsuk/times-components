import React, { Component } from "react";
import {
  addMissingProtocol,
  appendToImageURL,
  TcView
} from "@times-components/utils";
import Placeholder from "./placeholder";
import { defaultProps, propTypes } from "./image-prop-types";
import StyledImage from "./styles/responsive";

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highResIsLoaded: false
    };

    this.handleHighResOnLoad = this.handleHighResOnLoad.bind(this);
    this.getHighResImage = this.getHighResImage.bind(this);
  }

  getHighResImage(img) {
    if (img && img.complete) {
      this.handleHighResOnLoad();
    }
  }

  handleHighResOnLoad() {
    this.setState({
      highResIsLoaded: true
    });
  }

  highResImage({ highResSize, url }) {
    const { highResIsLoaded } = this.state;
    const { accessibilityLabel } = this.props;
    const imgUrl = highResSize
      ? appendToImageURL(url, "resize", highResSize)
      : url;

    return (
      <StyledImage
        alt={accessibilityLabel}
        ref={this.getHighResImage}
        loading="lazy"
        isLoaded={highResIsLoaded}
        onLoad={this.handleHighResOnLoad}
        onTransitionEnd={this.onHighResTransitionEnd}
        src={imgUrl}
        zIndex={2}
      />
    );
  }

  render() {
    const {
      aspectRatio,
      disablePlaceholder,
      highResSize,
      style,
      uri,
      onLayout,
      rounded,
      isLcpItem
    } = this.props;
    const { highResIsLoaded } = this.state;
    const url = addMissingProtocol(uri);
    const styles = {
      ...style
    };
    if (rounded) {
      Object.assign(styles, { borderRadius: "50%", overflow: "hidden" });
    }

    return (
      <TcView
        onLayout={onLayout}
        style={styles}
        testID="Image"
        className={(isLcpItem && "lcpItem") || ""}
      >
        <div style={{ paddingBottom: `${100 / aspectRatio}%` }}>
          {this.highResImage({ highResSize, url })}
          {disablePlaceholder || highResIsLoaded ? null : (
            <Placeholder borderRadius={rounded ? "50%" : 0} />
          )}
        </div>
      </TcView>
    );
  }
}

TimesImage.propTypes = propTypes;
TimesImage.defaultProps = defaultProps;

export default TimesImage;
