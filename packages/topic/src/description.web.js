import React from "react";
import { Text, View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import { Divider } from "./styles/responsive";
import styles from "./styles";

const Description = ({ description }) => (
  <View style={styles.container}>
    <Divider />
    <Text testID="topic-description" style={styles.description}>
      {description}
    </Text>
  </View>
);

Description.propTypes = propTypes.description;
Description.defaultProps = defaultProps.description;

export default Description;
