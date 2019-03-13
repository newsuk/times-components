import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";
import Gradient from "@times-components/gradient";
import styles from "./styles/index";
import T from "./t";

const { style: ViewPropTypesStyle } = ViewPropTypes;

function Placeholder({ height, style, width }) {
  const hasDimensions = width !== null && height !== null;
  return (
    <Gradient
      degrees={264}
      height={height}
      style={[style, !hasDimensions && { flex: 1 }]}
      width={width}
    >
      {width !== null ? (
        <View style={[styles.container, styles.placeholderContainer]}>
          <T width={width} />
        </View>
      ) : null}
    </Gradient>
  );
}

Placeholder.propTypes = {
  height: PropTypes.number,
  style: ViewPropTypesStyle,
  width: PropTypes.number
};

Placeholder.defaultProps = {
  height: null,
  style: null,
  width: null
};

export default Placeholder;
