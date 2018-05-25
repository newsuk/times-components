import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "./styles";

const AuthorProfileHeadJobTitle = ({ jobTitle }) => (
  <Text accessibilityRole="heading" aria-level="2" style={styles.jobTitle}>
    {jobTitle.toLowerCase()}
  </Text>
);

AuthorProfileHeadJobTitle.propTypes = {
  jobTitle: PropTypes.string.isRequired
};

export default AuthorProfileHeadJobTitle;
