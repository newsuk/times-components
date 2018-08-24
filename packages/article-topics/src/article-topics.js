import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import styleguide from "@times-components/styleguide";
import ArticleTopic from "./article-topic";
import styles from "./styles";
import propTypes from "./article-topic-prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

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

ArticleTopics.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypesStyle,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: propTypes.name.isRequired,
      slug: propTypes.slug.isRequired
    }).isRequired
  ).isRequired
};

ArticleTopics.defaultProps = {
  style: null
};

export default ArticleTopics;
