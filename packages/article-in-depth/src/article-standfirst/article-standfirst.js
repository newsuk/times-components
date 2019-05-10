import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { colours } from "@times-components/styleguide";
import styles from "../styles";

const HeaderStandfirst = ({ standfirst, color }) => {
  if (!standfirst) return null;

  return (
    <Text
      accessibilityRole="header"
      aria-level="2"
      style={[styles.standFirst, { color }]}
      testID="standfirst"
    >
      {standfirst}
    </Text>
  );
};

HeaderStandfirst.propTypes = {
  color: PropTypes.string,
  standfirst: PropTypes.string
};

HeaderStandfirst.defaultProps = {
  color: colours.functional.white,
  standfirst: null
};

export default HeaderStandfirst;
