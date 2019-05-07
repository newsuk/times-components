import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

const T = ({ size }) => (
  <Image
    resizeMode="contain"
    // eslint-disable-next-line global-require
    source={require("../../assets/t.png")}
    style={{ width: Math.floor(size / 4) }}
  />
);

T.propTypes = {
  size: PropTypes.number.isRequired
};

export default T;
