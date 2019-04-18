import React from "react";
import Context from "@times-components/context";
import { Text, View } from "react-native";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import styles from "./styles";
import topicPropTypes from "./article-topic-prop-types";

const ArticleTopic = ({ fontSize, lineHeight, name, onPress, slug }) => {
  const fontSizeStyle = fontSize ? { fontSize } : null;
  const lineHeightStyle = lineHeight ? { lineHeight } : null;
  return (
    <Context.Consumer>
      {({ makeTopicUrl }) => (
        <View style={styles.spacer}>
          <Link
            onPress={e => onPress(e, { name, slug })}
            url={makeTopicUrl({ slug })}
          >
            <View style={styles.container}>
              <Text
                accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityTraits="button"
                style={[styles.text, fontSizeStyle, lineHeightStyle]}
              >
                {name}
              </Text>
            </View>
          </Link>
        </View>
      )}
    </Context.Consumer>
  );
};

ArticleTopic.propTypes = topicPropTypes;

export default withTrackEvents(ArticleTopic, {
  analyticsEvents: [
    {
      actionName: "Pressed",
      eventName: "onPress",
      getAttrs: ({ name, slug }) => ({
        name,
        slug
      }),
      trackingName: "TopicLink"
    }
  ]
});
