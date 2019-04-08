import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleTopics from "@times-components/article-topics";
import { ResponsiveContext } from "@times-components/responsive";
import styles from "./styles";

const ShowTopics = ({ topics, onPress }) => {
  if (topics && topics.length > 0) {
    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <View
            style={[
              styles.topicsContainer,
              isTablet && styles.topicsContainerTablet
            ]}
          >
            <ArticleTopics onPress={onPress} topics={topics} />
          </View>
        )}
      </ResponsiveContext.Consumer>
    );
  }

  return null;
};

ShowTopics.propTypes = {
  onPress: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    }).isRequired
  )
};

ShowTopics.defaultProps = {
  topics: null
};

export default ShowTopics;
