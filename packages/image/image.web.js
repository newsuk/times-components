import React, { Component } from "react";
import PropTypes from "prop-types";
import placeholder from "./placeholder";

class Image extends Component {
  constructor(props) {
    super(props);

    const { resizeMode, source, height, width, style } = this.props;

    this.style = style;
    this.defaults = {
      height,
      width
    };
    this.important = {
      backgroundSize: resizeMode,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat"
    };

    this.state = {
      source
    };

    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    this.setState({
      source: {
        uri: placeholder
      }
    });
  }

  render() {
    return (
      <img
        {...this.props}
        alt=""
        onError={this.handleError}
        src={this.state.source.uri}
        style={{ ...this.defaults, ...this.style, ...this.important }}
      />
    );
  }
}

Image.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired
  }),
  resizeMode: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.shape()
};

Image.defaultProps = {
  source: {
    uri: ""
  },
  resizeMode: "contain",
  height: "inherit",
  width: "inherit",
  style: {}
};

export default Image;
