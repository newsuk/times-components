import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "../styles/article-body";

const BodyParagraph = props => (
  <View
    testID={`paragraph-${props.uid}`}
    accessibilityLabel={`paragraph-${props.uid}`}
    key={`paragraph-${props.uid}`}
    style={[styles.articleMainContentRow]}
  >
    <Text style={styles.articleTextElement}>{props.children}</Text>
  </View>
);

BodyParagraph.propTypes = {
  uid: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default BodyParagraph;
