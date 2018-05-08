import React from "react";
import { Text, View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles";
import Description from "./description";

const HeadContent = ({ name, description }) => (
  <View style={styles.container}>
    <Text
      testID="topic-name"
      accessibilityLabel="topic-name"
      accessibilityRole="heading"
      style={styles.name}
    >
      {name}
    </Text>
    {description ? <Description description={description} /> : null}
  </View>
);

HeadContent.propTypes = propTypes;
HeadContent.defaultProps = defaultProps;

export default HeadContent;
