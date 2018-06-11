import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import styles from "./styles";

const ArticleTopic = ({ name, onPress, slug }) => (
  <Link url={`/topic/${slug}`} onPress={e => onPress(e, { name, slug })}>
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  </Link>
);

ArticleTopic.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
};

export default withTrackEvents(ArticleTopic, {
  analyticsEvents: [
    {
      eventName: "onPress",
      actionName: "Pressed",
      trackingName: "TopicLink",
      getAttrs: ({ name, slug }) => ({
        name,
        slug
      })
    }
  ]
});
