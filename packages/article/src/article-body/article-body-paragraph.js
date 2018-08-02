import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import styles from "../styles/article-body";

const BodyParagraph = props => (
  <View
    key={`paragraph-${props.uid}`}
    style={[styles.articleMainContentRow]}
    testID={`paragraph-${props.uid}`}
  >
    <Context.Consumer>
      {({theme: {scale}}) => <Text style={styles(scale).articleTextElement}>{props.children}</Text> }
    </Context.Consumer>
  </View>
);

BodyParagraph.propTypes = {
  uid: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default BodyParagraph;
