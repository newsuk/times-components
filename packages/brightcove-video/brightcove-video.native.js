import React, { Component } from "react";
import { requireNativeComponent, View, Text } from "react-native";

import propTypes from "./brightcove-video.proptypes";
import defaults from "./brightcove-video.defaults";

const RNTBrightcove = requireNativeComponent("RNTBrightcove", null);

class BrightcoveVideo extends Component {
  static getNativeBrightcoveComponent() {
    return RNTBrightcove;
  }

  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.onChange = this.onChange.bind(this);
    this.onError = this.onError.bind(this);
  }

  onChange(evt) {
    this.props.onChange(evt.nativeEvent);
  }

  onError(evt) {
    this.emitError(evt.nativeEvent);
  }

  emitError(err) {
    const errors = [].concat(this.state.errors);
    errors.push(err);
    this.setState({ errors });
    this.props.onError(err);
  }

  render() {
    if (this.state.errors.length) {
      const errorItems = this.state.errors.map(error =>
        <Text key={`${error.code}_${error.message}`} style={{ color: "white" }}>
          {error.code} - {error.message}
        </Text>
      );

      return (
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: "red"
          }}
        >
          {errorItems}
        </View>
      );
    }

    const NativeBrightcove = BrightcoveVideo.getNativeBrightcoveComponent();

    return (
      <NativeBrightcove
        style={{ height: this.props.height, width: this.props.width }}
        policyId={this.props.policyId}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
        onChange={this.onChange}
        onLoadingError={this.onError} // android handler seems to be reserved on iOS
        onIOSError={this.onError} // so we use this instead
      />
    );
  }
}

BrightcoveVideo.defaultProps = defaults;
BrightcoveVideo.propTypes = propTypes;

export default BrightcoveVideo;
