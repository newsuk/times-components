import React, { Component } from "react";
import { Image, View } from "react-native";
import {
  addMissingProtocol,
  normaliseWidth,
  screenWidthInPixels
} from "@times-components/utils";
import { defaultProps, propTypes } from "./image-prop-types";
import Placeholder from "./placeholder";
import styles from "./styles";

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      width: normaliseWidth(screenWidthInPixels())
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { aspectRatio, style, uri } = this.props;
    const { isLoaded, width } = this.state;
    // web handles missing protocols just fine, native doesn't. This evens out support.
    const cleanUri = addMissingProtocol(uri);

    const props = {
      style: styles.imageBackground,
      onLoad: this.handleLoad
    };

    const isDataImageUrl = uri.indexOf("data:") > -1;

    if (isDataImageUrl) {
      props.source = {
        uri: cleanUri
      };
    } else if (cleanUri && width > 0) {
      const regExResize = new RegExp("([?&])resize", "gi");
      const hasResizeParameter = regExResize.test(cleanUri);

      const hasQueryString = cleanUri.indexOf("?") > -1;
      const delimiter = hasQueryString ? "&" : "?";

      props.source = {
        uri: hasResizeParameter
          ? cleanUri
          : `${cleanUri}${delimiter}resize=${width}`
      };
    }

    return (
      <View aspectRatio={aspectRatio} style={style}>
        {isLoaded ? null : <Placeholder />}
        <Image {...props} />
      </View>
    );
  }
}

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
