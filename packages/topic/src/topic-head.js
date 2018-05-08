import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const TopicHead = ({ name, description }) => (
  <View style={styles.container}>
    <Text
      testID="topic-name"
      accessibilityLabel="topic-name"
      accessibilityRole="heading"
      style={styles.name}
    >
      {name}
    </Text>
    <Text testID="topic-description" style={styles.description}>
      {description}
    </Text>
  </View>
);

TopicHead.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

TopicHead.defaultProps = {
  description: ""
};

export default TopicHead;
