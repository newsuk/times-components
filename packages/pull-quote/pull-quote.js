import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const PullQuotes = props => (
  <View style={styles.container}>
    <Text style={[styles.quotes, { color: props.quoteColour }]}>&ldquo;</Text>
    <Text style={styles.content}>{props.content}</Text>
    <Text style={[styles.caption, { color: props.captionColour }]}>
      {props.caption}
    </Text>
  </View>
);

PullQuotes.propTypes = {
  content: PropTypes.string.isRequired,
  caption: PropTypes.string,
  captionColour: PropTypes.string,
  quoteColour: PropTypes.string
};

PullQuotes.defaultProps = {
  caption: "",
  quoteColour: "#13354e",
  captionColour: "#696969"
};

export default PullQuotes;
