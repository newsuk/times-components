import React, { Component } from "react";
import { View, Text } from "react-native";
import BrightcoveVideo from "../brightcove-video"; //@times-components/brightcove-video ?
import { Helmet } from "react-helmet";

const styleSheet = {
  body: {
    background: "#FF0000"
  }
};

class TimesBrightcove extends Component {
  render() {
    return (
      <div>
        <BrightcoveVideo {...this.props} />
        <Helmet
          style={[
            {
              type: "text/css",
              cssText: `.video-js button.vjs-big-play-button {
                width: 85px;
                height: 85px;

                background: transparent !important;

                line-height: 1.65em;

                border-radius: 0;
                border-style: solid;
                border-width: 4px;
                border-color: white;
              }
              .video-js button.vjs-big-play-button:before {
                font-size: 77px;
                left: -2px;
              }`
            }
          ]}
        />
      </div>
    );
  }
}

export default TimesBrightcove;
