import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import leaves from "../../../assets/leaves.png";
import cake from "../../../assets/cake.png";
import registerLogo from "../../../assets/daily-universal-register.png";

const images = {
  birthdays: cake,
  logo: registerLogo,
  "nature notes": leaves
};

const Logo = ({ type, style }) => (
  <Image resizeMode="contain" source={images[type]} style={style} />
);

Logo.propTypes = {
  style: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired
};

export default Logo;
