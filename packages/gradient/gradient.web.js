import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import StylePropTypes from "react-style-proptype";

const { supportingArrays } = StylePropTypes;
const Gradient = ({ degrees, children, style }) => (
  <View
    style={[
      {
        backgroundImage: `linear-gradient(${
          degrees
        }deg, #f9f9f9 0%, #ededed 100%)`
      },
      style
    ]}
  >
    {children}
  </View>
);

Gradient.defaultProps = {
  degrees: 265,
  children: null,
  style: null
};

Gradient.propTypes = {
  degrees: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  style: supportingArrays
};

export default Gradient;
