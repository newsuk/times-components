import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import orderBy from "lodash.orderby";
import ArticleTopic from "./article-topic";
import styles from "./styles";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const ArticleTopics = ({ topics, style, onPress }) => {
  const orderedTopics = orderBy(topics, "order", "asc");

  return (
    <View style={[styles.topicGroup, style]}>
      {orderedTopics.map(({ name, slug }) => (
        <ArticleTopic key={slug} slug={slug} name={name} onPress={onPress} />
      ))}
    </View>
  );
};

ArticleTopics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onPress: PropTypes.func,
  style: ViewPropTypesStyle
};

ArticleTopics.defaultProps = {
  style: null,
  onPress: () => {}
};

export default ArticleTopics;
