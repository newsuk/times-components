import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import ArticleTopic from "./article-topic";
import styles from "./styles";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const ArticleTopics = ({ onPress, style, topics }) => (
  <View style={[styles.topicGroup, style]}>
    {topics.map(({ name, slug }) => (
      <ArticleTopic key={slug} name={name} onPress={onPress} slug={slug} />
    ))}
  </View>
);

ArticleTopics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: ArticleTopic.propTypes.name,
      slug: ArticleTopic.propTypes.slug
    }).isRequired
  ).isRequired,
  onPress: ArticleTopic.propTypes.onPress,
  style: ViewPropTypesStyle
};

ArticleTopics.defaultProps = {
  style: null
};

export default ArticleTopics;
