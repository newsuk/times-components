import React from "react";
import { View } from "react-native";
import Svg, { Polygon, Rect } from "svgs";

const PlayIcon = () => (
  <View>
    <Svg height={70} viewBox="0 0 100 100" width={70}>
      <Rect
        fill="rgba(0,0,0)"
        fillOpacity="0.4"
        height="100"
        stroke="rgb(255,255,255)"
        strokeWidth="8"
        width="100"
      />
      <Polygon fill="rgb(255,255,255)" points="30,20 70,50 30,80" />
    </Svg>
  </View>
);

export default PlayIcon;
