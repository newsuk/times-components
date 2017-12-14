import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { TextLink } from "@times-components/link";
import styles from "./styles";

const ShowTwitter = twitter => {
  if (twitter) {
    const url = `https://twitter.com/${twitter}`;
    return [
      ", ",
      <TextLink key={url} style={styles.link} url={url} onPress={() => null}>
        {twitter}
      </TextLink>
    ];
  }
  return null;
};

const PullQuotes = props => (
  <View style={styles.container}>
    <Text style={[styles.quotes, { color: props.quoteColour }]}>&ldquo;</Text>
    <Text style={styles.content}>{props.content}</Text>
    <Text style={[styles.caption, { color: props.captionColour }]}>
      {props.caption}
      {ShowTwitter(props.twitter)}
    </Text>
  </View>
);

PullQuotes.propTypes = {
  content: PropTypes.string.isRequired,
  caption: PropTypes.string,
  captionColour: PropTypes.string,
  quoteColour: PropTypes.string,
  twitter: PropTypes.string
};

PullQuotes.defaultProps = {
  caption: "",
  quoteColour: "#13354e",
  captionColour: "#696969",
  twitter: ""
};

export default PullQuotes;
