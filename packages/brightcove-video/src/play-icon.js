import React from "react";
import PropTypes from "prop-types";
import Svg, { Polygon, Rect } from "@times-components/svgs";
import { View } from "react-native";

const PlayIcon = ({ icon }) => (
  <View>
    {icon || (
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
    )}
  </View>
);

PlayIcon.defaultProps = {
  icon: null
};

PlayIcon.propTypes = {
  icon: PropTypes.node
};

export default PlayIcon;
