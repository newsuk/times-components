import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Description = ({ description }) => (
  <View style={styles.container}>
    <View style={styles.divider} />
    <Text testID="topic-description" style={styles.description}>
      {description}
    </Text>
  </View>
);

Description.propTypes = {
  description: PropTypes.string
};

Description.defaultProps = {
  description: ""
};

export default Description;
