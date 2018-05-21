import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Name = ({ name }) => (
  <Text
    testID="topic-name"
    accessibilityLabel="topic-name"
    accessibilityRole="heading"
    style={styles.name}
  >
    {name}
  </Text>
);

Name.propTypes = {
  name: PropTypes.string.isRequired
};

export default Name;
