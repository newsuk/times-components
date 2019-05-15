import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "../styles/article-header";

const HeaderStandfirst = ({ hasFlags, standfirst }) => {
  if (!standfirst) return null;

  return (
    <Text
      accessibilityRole="header"
      aria-level="2"
      style={[styles.standFirst, !hasFlags && styles.standFirstWithoutFlags]}
      testID="standfirst"
    >
      {standfirst}
    </Text>
  );
};

HeaderStandfirst.propTypes = {
  hasFlags: PropTypes.bool.isRequired,
  standfirst: PropTypes.string
};

HeaderStandfirst.defaultProps = {
  standfirst: null
};

export default HeaderStandfirst;
