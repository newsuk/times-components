import React from "react";
import ArticleTopics from "@times-components/article-topics";
import PropTypes from "prop-types";
import styles from "./styles";
import { TopicsContainer, TopicsMetaContainer } from "./styles/responsive";

const ShowTopics = ({ device, onPress, topics }) => {
  if (topics && topics.length > 0) {
    if (device === "DESKTOP") {
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

    return (
      <TopicsContainer>
        <nav>
          <ArticleTopics
            onPress={onPress}
            style={styles.topicsContainer}
            topics={topics}
          />
        </nav>
      </TopicsContainer>
    );
  }

  return null;
};

ShowTopics.propTypes = {
  device: PropTypes.oneOf(["DESKTOP", null]),
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
