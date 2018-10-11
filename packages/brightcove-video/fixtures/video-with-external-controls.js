import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import Button from "./button";
import BrightcoveVideo from "../src/brightcove-video";

class VideoWithExternalControls extends Component {
  render() {
    return (
      <View>
        <BrightcoveVideo
          accountId={this.props.accountId}
          policyKey={this.props.policyKey}
          ref={ref => {
            this.bcVideo = ref;
          }}
          videoId={this.props.videoId}
        />
        <Button
          buttonText="play"
          onPress={() => {
            this.bcVideo.play();
          }}
          testID="external-play"
        />
        <Button
          buttonText="pause"
          onPress={() => {
            this.bcVideo.pause();
          }}
          testID="external-pause"
        />
        <Button
          buttonText="reset"
          onPress={() => {
            this.bcVideo.reset();
          }}
          testID="external-reset"
        />
      </View>
    );
  }
}

VideoWithExternalControls.propTypes = {
  accountId: PropTypes.string.isRequired,
  policyKey: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired
};

export default VideoWithExternalControls;
