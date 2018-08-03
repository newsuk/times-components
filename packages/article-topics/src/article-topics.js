import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import ArticleTopic from "./article-topic";
import styles from "./styles";
import propTypes from "./article-topic-prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const ArticleTopics = ({ onPress, style, topics }) => (
  <View style={[styles.topicGroup, style]}>
    {topics.map(({ name, slug }) => (
      <ArticleTopic key={slug} name={name} onPress={onPress} slug={slug} />
    ))}
  </View>
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
