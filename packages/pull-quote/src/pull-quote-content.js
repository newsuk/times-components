import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styleFactory from "./styles";

const PullQuoteContent = ({ children, scale, isTablet }) => {
  const styles = styleFactory(scale, isTablet);
  return <Text style={styles.content}>{children}</Text>;
};

PullQuoteContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  isTablet: PropTypes.bool.isRequired,
  scale: PropTypes.string.isRequired
};

export default PullQuoteContent;
