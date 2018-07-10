import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import ArticleTopic from "./article-topic";
import styles from "./styles";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const ArticleTopics = ({ topics, style, onPress }) => (
  <View style={[styles.topicGroup, style]}>
    {topics.map(({ name, slug }) => (
      <ArticleTopic key={slug} name={name} onPress={onPress} slug={slug} />
    ))}
  </View>
);

ArticleTopics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypesStyle
};

ArticleTopics.defaultProps = {
  style: null
};

export default ArticleTopics;
