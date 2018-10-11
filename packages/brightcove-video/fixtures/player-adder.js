import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import Button from "./button";
import BrightcoveVideo from "../src/brightcove-player";

class VideoAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoCount: 0
    };
  }

  getVideos(count) {
    const videos = [];
    let i = 0;

    while (i < count) {
      videos.push(
        <BrightcoveVideo
          accountId={this.props.accountId}
          height={200}
          key={i}
          policyKey={this.props.policyKey}
          videoId={this.props.videoId}
          width={300}
        />
      );

      i += 1;
    }

    return <View>{videos}</View>;
  }

  render() {
    return (
      <View>
        {this.getVideos(this.state.videoCount)}
        <Button
          buttonText="click here to add a video"
          onPress={() => {
            this.setState({ videoCount: this.state.videoCount + 1 });
          }}
        />
      </View>
    );
  }
}

VideoAdder.propTypes = {
  accountId: PropTypes.string.isRequired,
  policyKey: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired
};

export default VideoAdder;
