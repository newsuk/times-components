import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import styles from "./styles";

const Topic = ({ id, name, onPress }) => (
  <Link url={`/topic/${id}`} onPress={e => onPress(e, { id, name })}>
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  </Link>
);

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

Topic.defaultProps = {
  onPress: () => {}
};

export default withTrackEvents(Topic, {
  analyticsEvents: [
    {
      eventName: "onPress",
      actionName: "Pressed",
      trackingName: "TopicLink",
      getAttrs: ({ id, name }) => ({
        id,
        name
      })
    }
  ]
});
