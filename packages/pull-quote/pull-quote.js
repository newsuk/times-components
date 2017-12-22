import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { TextLink } from "@times-components/link";
import styles from "./styles";

const ShowTwitter = twitter => {
  if (!twitter) {
    return null;
  }

  const url = `https://twitter.com/${twitter}`;

  return (
    <React.Fragment>
      ,&nbsp;
      <TextLink key={url} style={styles.link} url={url} onPress={() => null}>
        {twitter}
      </TextLink>
    </React.Fragment>
  );
};

const { container, quotes, content, caption } = styles;

const PullQuotes = props => (
  <View style={container}>
    <Text style={[quotes, { color: props.quoteColour }]}>&ldquo;</Text>
    <Text style={content}>{props.content}</Text>
    <Text style={[caption, { color: props.captionColour }]}>
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
