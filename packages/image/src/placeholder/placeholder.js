import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "../styles/index";
import T from "../logo/t";

function Placeholder({ dimensions }) {
  return (
    <View height="100%" style={styles.placeholder} width="100%">
      {dimensions && <T width={dimensions.width} />}
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
