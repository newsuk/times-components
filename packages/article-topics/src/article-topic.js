import React from "react";
import Context from "@times-components/context";
import { TcText, TcView, checkStylesForUnits } from "@times-components/utils";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import styles from "./styles";
import topicPropTypes from "./article-topic-prop-types";

const ArticleTopic = ({ fontSize, lineHeight, name, onPress, slug }) => {
  const fontSizeStyle = fontSize ? { fontSize } : null;
  const lineHeightStyle = lineHeight
    ? { ...checkStylesForUnits({ lineHeight }) }
    : null;
  const textStyles = {
    ...styles.text,
    fontSizeStyle,
    ...lineHeightStyle
  };
  return (
    <Context.Consumer>
      {({ makeTopicUrl }) => (
        <TcView style={styles.spacer}>
          <Link
            onPress={e => onPress(e, { name, slug })}
            url={makeTopicUrl({ slug })}
          >
            <TcView style={styles.container}>
              <TcText
                accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityTraits="button"
                style={textStyles}
              >
                {name}
              </TcText>
            </TcView>
          </Link>
        </TcView>
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
