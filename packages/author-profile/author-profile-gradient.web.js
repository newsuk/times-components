import PropTypes from "prop-types";
import React from "react";
import StylePropTypes from "react-style-proptype";
import { View } from "react-native";

const Gradient = ({ angle, children, style }) => (
  <View
    style={[
      {
        flex: 1,
        backgroundImage: `linear-gradient(${angle}deg, #f9f9f9 0%, #ededed 100%)`
      },
      style
    ]}
  >
    {children}
  </View>
);

Gradient.defaultProps = {
  angle: 265,
  children: null,
  style: null
};

Gradient.propTypes = {
  angle: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  style: StylePropTypes
};

export default Gradient;
