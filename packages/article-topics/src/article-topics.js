import React from "react";
import { View } from "react-native";
import Context from "@times-components/context";
import styleguide from "@times-components/styleguide";
import ArticleTopic from "./article-topic";
import styles from "./styles";
import {
  topicsDefaultProps,
  topicsPropTypes
} from "./article-topics-prop-types";

const renderArticleTopics = (topics, onPress, fontStyle) =>
  topics.map(({ name, slug }) => (
    <ArticleTopic
      fontSize={fontStyle.fontSize}
      key={slug}
      lineHeight={fontStyle.lineHeight}
      name={name}
      onPress={onPress}
      slug={slug}
    />
  ));

const ArticleTopics = ({ onPress, style, topics }) => (
  <Context.Consumer>
    {({ theme: { scale } }) => {
      const themedStyleguide = styleguide({ scale });

      return (
        <View style={[styles.topicGroup, style]}>
          {renderArticleTopics(
            topics,
            onPress,
            themedStyleguide.fontFactory({
              font: "supporting",
              fontSize: "link"
            })
          )}
        </View>
      );
    }}
  </Context.Consumer>
);

ArticleTopics.propTypes = topicsPropTypes;
ArticleTopics.defaultProps = topicsDefaultProps;

export default ArticleTopics;
