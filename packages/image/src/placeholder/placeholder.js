import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "../styles/index";
import T from "../logo/t";

function Placeholder({ dimensions }) {
  if (!dimensions) {
    return null;
  }

  const { height, width } = dimensions;

  return (
    <View height={height} style={styles.placeholder} width={width}>
      <T width={width} />
    </View>
  );
}

Placeholder.propTypes = {
  dimensions: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  })
};

Placeholder.defaultProps = {
  dimensions: null
};

export default Placeholder;
