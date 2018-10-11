import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { addMissingProtocol } from "@times-components/utils";
import Placeholder from "./placeholder";
import { defaultProps, propTypes } from "./image-prop-types";
import appendSize from "./utils";
import StyledImage from "./styles/responsive";

class TimesImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highResIsLoaded: props.lowResSize && props.highResSize,
      highResIsVisible: false,
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
      highResIsLoaded: true
    });
  }

  handleLowResOnLoad() {
    this.setState({
      lowResIsLoaded: true
    });
  }

  highResImage({ highResSize, lowResSize, url }) {
    if (!lowResSize || highResSize) {
      return (
        <StyledImage
          alt=""
          isLoaded={
            lowResSize && highResSize ? this.state.highResIsLoaded : true
          }
          onLoad={this.handleHighResOnLoad}
          onTransitionEnd={this.onHighResTransitionEnd}
          src={appendSize(url, "resize", highResSize)}
          zIndex={2}
        />
      );
    }

    return null;
  }

  lowResImage({ lowResSize, url }) {
    if (lowResSize && !this.state.highResIsVisible) {
      return (
        <StyledImage
          alt=""
          isLoaded={this.state.lowResIsLoaded}
          onLoad={this.handleLowResOnLoad}
          src={appendSize(url, "resize", lowResSize)}
          zIndex={1}
        />
      );
    }

    return null;
  }

  render() {
    const { aspectRatio, highResSize, lowResSize, style, uri } = this.props;
    const url = addMissingProtocol(uri);

    const styles = StyleSheet.create({
      placeholder: {
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 0
      },
      wrapper: {
        display: "table",
        height: 0,
        overflow: "hidden",
        paddingBottom: `${100 / aspectRatio}%`
      }
    });

    return (
      <View style={style}>
        <div style={StyleSheet.flatten(styles.wrapper)}>
          {this.highResImage({ highResSize, lowResSize, url })}
          {this.lowResImage({ lowResSize, url })}
          <Placeholder style={styles.placeholder} />
        </div>
      </View>
    );
  }
}

TimesImage.propTypes = propTypes;
TimesImage.defaultProps = defaultProps;

export default TimesImage;
