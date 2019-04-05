import React from "react";
import { View } from "react-native";
import Svg, { Polygon, Rect } from "@times-components/svgs";

const PlayIcon = () => (
  <View>
    <Svg height={70} viewBox="0 0 100 100" width={70}>
      <Rect
        fill="#000000"
        fillOpacity="0.4"
        height="100"
        width="100"
        x="0"
        y="0"
      />
      <Rect
        fillOpacity="0"
        height="100"
        stroke="#FFFFFF"
        strokeWidth="8"
        width="100"
        x="0"
        y="0"
      />
      <Polygon fill="#FFFFFF" points="30,20 70,50 30,80" />
    </Svg>
  </View>
);

export default PlayIcon;
