import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import styles from "./styles/index";

function Placeholder({ dimensions }) {
  if (!dimensions) {
    return null;
  }

  const { height, width } = dimensions;

  return (
    <View
      height={height}
      style={[
        styles.container,
        styles.placeholderContainer,
        styles.placeholderBackground
      ]}
      width={width}
    >
      <Image
        resizeMode="contain"
        // eslint-disable-next-line global-require
        source={require("../assets/t.png")}
        style={{ width: Math.floor(width / 4) }}
      />
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
