import React, { Component } from "react";
import {
  addMissingProtocol,
  appendToImageURL,
  TcView
} from "@times-components/utils";
import { defaultProps, propTypes } from "./image-prop-types";
import StyledImage from "./styles/responsive";

class TimesImage extends Component {
  highResImage({ highResSize = 300, url }) {
    const { accessibilityLabel, isWebPFormatActive } = this.props;
    const imgUrl = appendToImageURL(url, "resize", highResSize);
    return (
      <picture>
        {isWebPFormatActive && (
          <source
            srcSet={appendToImageURL(imgUrl, "format", "webp")}
            type="image/webp"
          />
        )}
        <StyledImage
          alt={accessibilityLabel}
          loading="lazy"
          src={imgUrl}
          zIndex={2}
        />
      </picture>
    );
  }

  render() {
    const {
      aspectRatio,
      highResSize,
      style,
      uri,
      onLayout,
      rounded,
      isLcpItem
    } = this.props;
    const url = addMissingProtocol(uri);
    const styles = {
      ...style
    };
    Object.assign(styles, { backgroundColor: "#efefef" });
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
        <div
          style={{
            paddingBottom: `${100 / aspectRatio}%`,
            position: "relative",
            overflow: "hidden"
          }}
        >
          {this.highResImage({ highResSize, url })}
        </div>
      </TcView>
    );
  }
}

TimesImage.propTypes = propTypes;
TimesImage.defaultProps = defaultProps;

export default TimesImage;
