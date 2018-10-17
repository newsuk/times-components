import React from "react";
import ArticleTopics from "@times-components/article-topics";
import PropTypes from "prop-types";
import styles from "../styles/article-topics";
import { TopicsMetaContainer } from "../styles/article-topics/responsive";

const ShowTopics = ({ onPress, topics }) => {
  if (topics && topics.length > 0) {
      return (
        <TopicsMetaContainer>
          <nav>
            <ArticleTopics
              onPress={onPress}
              style={styles.topicsMetaContainer}
              topics={topics}
            />
          </nav>
        </TopicsMetaContainer>
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
  device: null,
  topics: null
};

export default ShowTopics;
