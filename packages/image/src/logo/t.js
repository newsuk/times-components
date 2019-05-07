import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

const T = ({ width }) => (
  <Image
    resizeMode="contain"
    // eslint-disable-next-line global-require
    source={require("../../assets/t.png")}
    style={{ width: Math.floor(width / 4) }}
  />
);

T.propTypes = {
  width: PropTypes.number.isRequired
};

export default T;
