import React, { Component } from "react";
import { TouchableWithoutFeedback, View, Image } from "react-native";
import PropTypes from "prop-types";
import TimesImage from "@times-components/image";
import BrightcoveVideo from "@times-components/brightcove-video";
import PlayIcon from "./play-icon";

const defaultImg = {
  uri: "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
};

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
        <View>
          <TimesImage
            source={this.props.poster}
            style={{
              width: this.props.width,
              height: this.props.height
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: this.props.width,
              height: this.props.height,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {this.props.playIcon
              ? <Image
                  source={this.props.playIcon}
                  style={{
                    width: this.props.playIconWidth,
                    height: this.props.playIconHeight
                  }}
                />
              : <PlayIcon
                  width={this.props.playIconWidth}
                  height={this.props.playIconHeight}
                />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

BrightcoveVideoLauncher.propTypes = Object.assign(
  {
    poster: Image.propTypes.source,
    playIcon: Image.propTypes.source,
    playIconWidth: PropTypes.number,
    playIconHeight: PropTypes.number
  },
  BrightcoveVideo.propTypes
);

BrightcoveVideoLauncher.defaultProps = Object.assign(
  {
    poster: defaultImg,
    playIcon: null,
    playIconWidth: 70,
    playIconHeight: 70
  },
  BrightcoveVideo.defaultProps
);

BrightcoveVideoLauncher.defaultProps.autoplay = true;

export default BrightcoveVideoLauncher;
