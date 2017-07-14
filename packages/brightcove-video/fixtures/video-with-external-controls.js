/* eslint import/no-unresolved: "off" */

import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import Button from "./button";
import BrightcoveVideo from "../brightcove-video";

class VideoWithExternalControls extends Component {
  render() {
    return (
      <View>
        <BrightcoveVideo
          ref={ref => (this.bcVideo = ref)}
          policyId={this.props.policyId}
          videoId={this.props.videoId}
          accountId={this.props.accountId}
        />
        <Button
          buttonText="play"
          onPress={() => {
            this.bcVideo.play();
          }}
        />
        <Button
          buttonText="pause"
          onPress={() => {
            this.bcVideo.pause();
          }}
        />
      </View>
    );
  }
}

VideoWithExternalControls.propTypes = {
  videoId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  policyId: PropTypes.string.isRequired
};

export default VideoWithExternalControls;
