import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import BrightcoveVideo from "@times-components/brightcove-video";
import Splash from "./splash";

class BrightcoveVideoLauncher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launched: false
    };

    this.launchVideo = this.launchVideo.bind(this);
  }

  launchVideo() {
    this.setState({ launched: true });
  }

  render() {
    if (this.state.launched) {
      return <BrightcoveVideo {...this.props} />;
    }

    return (
      <TouchableWithoutFeedback onPress={this.launchVideo}>
        <View style={{ width: this.props.width, height: this.props.height }}>
          <Splash {...this.props} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

BrightcoveVideoLauncher.propTypes = Object.assign(
  {},
  Splash.propTypes,
  BrightcoveVideo.propTypes
);

BrightcoveVideoLauncher.defaultProps = Object.assign(
  {},
  Splash.defaultProps,
  BrightcoveVideo.defaultProps
);

BrightcoveVideoLauncher.defaultProps.autoplay = true;

export default BrightcoveVideoLauncher;
