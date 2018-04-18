import React, { Component } from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

import InlineVideoPlayer from "./inline-video-player";
import IsPaidSubscriber from "./is-paid-subscriber";
import { propTypes, defaultProps } from "./brightcove-video.proptypes";

class BrightcoveVideo extends Component {
  render() {
    const { paidonly, width, height, poster } = this.props;

    return (
      <IsPaidSubscriber.Consumer>
        {isPaidSubscriber =>
          paidonly && !isPaidSubscriber ? (
            <Image style={{ width, height }} source={poster} />
          ) : (
            <InlineVideoPlayer {...this.props} />
          )
        }
      </IsPaidSubscriber.Consumer>
    );
  }
}

BrightcoveVideo.defaultProps = defaultProps;
BrightcoveVideo.propTypes = propTypes;

export default BrightcoveVideo;
