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
      {orderedTopics.map(({ id, name }) => (
        <ArticleTopic key={id} id={id} name={name} onPress={onPress} />
      ))}
    </View>
  );
};

ArticleTopics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired
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
