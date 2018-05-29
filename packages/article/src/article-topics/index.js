import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleTopics from "@times-components/article-topics";
import styles from "./styles";

const ShowTopics = ({ topics }) => {
  if (topics && topics.length > 0) {
    return (
      <View style={styles.topicsContainer}>
        <ArticleTopics topics={topics} />
      </View>
    );
  }

  return null;
};

ShowTopics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      order: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired
  )
};

ShowTopics.defaultProps = {
  topics: null
};

export default ShowTopics;
