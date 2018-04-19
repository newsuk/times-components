import React from "react";
import Svg, { Polygon, Rect } from "svgs";
import { View } from "react-native";

const PlayIcon = () => (
  <View>
    <Svg width={70} height={70} viewBox="0 0 100 100">
      <Rect
        width="100"
        height="100"
        fill="rgba(0,0,0)"
        strokeWidth="8"
        stroke="rgb(255,255,255)"
        fillOpacity="0.4"
      />
      <Polygon points="30,20 70,50 30,80" fill="rgb(255,255,255)" />
    </Svg>
  </View>
);

export default PlayIcon;
