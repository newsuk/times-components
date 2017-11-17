import React, { Component } from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import Placeholder from "./placeholder";

const { style: ViewPropTypesStyle } = ViewPropTypes;

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
    const { uri, aspectRatio, style } = this.props;
    const { isLoaded } = this.state;

    const aspectRatioStyle = {
      height: 0,
      overflow: "hidden",
      paddingBottom: `${100 / aspectRatio}%`
    };

    const placeholderStyle = {
      flex: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    const placeholderComponent = isLoaded ? null : (
      <Placeholder style={placeholderStyle} />
    );

    const boundedImg = (
      <div style={aspectRatioStyle}>
        <img
          src={uri}
          style={{ display: "block", width: "100%" }}
          onLoad={this.handleLoad}
          alt=""
        />
        {placeholderComponent}
      </div>
    );

    // divs cannot be styled with the output of Stylesheet.create()
    // only react native Views accept those ids
    return style ? <View style={style}>{boundedImg}</View> : boundedImg;
  }
}

TimesImage.defaultProps = {
  style: {}
};

TimesImage.propTypes = {
  uri: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  style: ViewPropTypesStyle
};

export default TimesImage;
