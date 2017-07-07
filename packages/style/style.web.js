import React, { Component } from "react";
import { View, Text } from "react-native";

class TimesBrightcove extends Component {
  render() {
    return (
      <div>
        <BrightcoveVideo />
        <Style>{
          `body {
            display: none;
          }
        `}</Style>
      </div>
    );
  }
}

export default BrightcoveVideo;
