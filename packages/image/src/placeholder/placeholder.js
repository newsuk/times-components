import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "../styles/index";
import T from "../logo/t";

function Placeholder({ size }) {
  return (
    <View height="100%" style={styles.placeholder} width="100%">
      <T size={size} />
    </View>
  );
}

Placeholder.propTypes = {
  size: PropTypes.number
};

Placeholder.defaultProps = {
  size: null
};

export default Placeholder;
