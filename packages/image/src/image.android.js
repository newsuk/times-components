import React, { Component } from "react";
import { ImageBackground, View } from "react-native";
import styles from "./style-native";
import { defaultProps, propTypes } from "./image-prop-types";
import Placeholder from "./placeholder";
import addMissingProtocol from "./add-missing-protocol";

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isHighResolutionLoaded: false
    };

    this.handleLoad = this.handleLoad.bind(this);
    this.handlePreviewLoad = this.handlePreviewLoad.bind(this);
  }

  handleLoad() {
    this.setState({
      isLoaded: true,
      isHighResolutionLoaded: true
    });
  }

  handlePreviewLoad() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { uri: dirtyUri, style, aspectRatio } = this.props;
    const { isLoaded } = this.state;
    // web handles missing protocols just fine, native doesn't. This evens out support.
    const uri = addMissingProtocol(dirtyUri);
    const previewUri = this.state.isHighResolutionLoaded
      ? null
      : `${uri}&preview=true`; // TODO: Implement a separate uri for preview

    const props = {
      style: styles.imageBackground,
      onLoad: this.handleLoad
    };

    if (uri) {
      props.source = { uri };
    }

    const previewProps = {
      ...props,
      source: { uri: previewUri },
      onLoad: this.handlePreviewLoad
    };

    return (
      <View aspectRatio={aspectRatio} style={style}>
        <ImageBackground {...previewProps}>
          <ImageBackground {...props}>
            {isLoaded ? null : <Placeholder />}
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
