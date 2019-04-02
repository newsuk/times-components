import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";
import Gradient from "@times-components/gradient";
import styles from "./styles/index";
import T from "./t";

const { style: ViewPropTypesStyle } = ViewPropTypes;

function Placeholder({ dimensions, style }) {
  if (!dimensions) {
    return null;
  }

  const { height, width } = dimensions;

  return (
    <Gradient degrees={264} height={height} style={style} width={width}>
      <View style={[styles.container, styles.placeholderContainer]}>
        <T width={width} />
      </View>
    </Gradient>
  );
}

Placeholder.propTypes = {
  dimensions: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }),
  style: ViewPropTypesStyle
};

Placeholder.defaultProps = {
  dimensions: null,
  style: null
};

export default Placeholder;
