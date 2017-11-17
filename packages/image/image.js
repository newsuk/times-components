import React, { Component } from "react";
import { ImageBackground, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";
import Placeholder from "./placeholder";

const { style: ViewPropTypesStyle } = ViewPropTypes;

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
    const { uri: dirtyUri, style, aspectRatio } = this.props;
    const { isLoaded } = this.state;
    // web handles missing protocols just fine, native doesn't. This evens out support.
    const uri = addMissingProtocol(dirtyUri);

    const props = {
      style: [{ width: "100%", height: "100%" }].concat(style),
      onLoad: this.handleLoad,
      aspectRatio
    };

    if (uri) {
      props.source = { uri };
    }

    return (
      <View aspectRatio={aspectRatio}>
        <ImageBackground {...props}>
          {isLoaded ? null : <Placeholder style={style} />}
        </ImageBackground>
      </View>
    );
  }
}

TimesImage.defaultProps = {
  style: {},
  uri: ""
};

TimesImage.propTypes = {
  uri: PropTypes.string,
  aspectRatio: PropTypes.number.isRequired,
  style: ViewPropTypesStyle
};

export default TimesImage;
