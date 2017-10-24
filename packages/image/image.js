import React, { Component } from "react";
import { Image } from "react-native";
import Placeholder from "./placeholder";
import imagePropTypes from "./image-prop-types";

const addMissingProtocol = uri => (uri.startsWith("//") ? `https:${uri}` : uri);

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { uri: dirtyUri, aspectRatio, style } = this.props;
    const { isLoaded } = this.state;
    // web handles missing protocols just fine, native doesnt. This evens out support.
    const uri = addMissingProtocol(dirtyUri);
    return (
      <Image
        style={style}
        source={{ uri }}
        aspectRatio={aspectRatio}
        onLoad={this.handleLoad}
      >
        {isLoaded ? null : <Placeholder />}
      </Image>
    );
  }
}

TimesImage.propTypes = imagePropTypes;

export default TimesImage;
