import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "./styles";

const PullQuoteContent = ({ children }) => (
  <Text style={styles.content}>{children}</Text>
);

PullQuoteContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
};

export default PullQuoteContent;
