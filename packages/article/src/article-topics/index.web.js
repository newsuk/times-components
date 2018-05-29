import React from "react";
import ArticleTopics from "@times-components/article-topics";
import PropTypes from "prop-types";
import styles from "./styles";
import { TopicsContainer, TopicsMetaContainer } from "./styles/responsive";

const ShowTopics = ({ topics, device }) => {
  if (topics && topics.length > 0) {
    if (device === "DESKTOP") {
      return (
        <TopicsMetaContainer>
          <ArticleTopics topics={topics} style={styles.topicsMetaContainer} />
        </TopicsMetaContainer>
      );
    }

    return (
      <TopicsContainer>
        <ArticleTopics topics={topics} style={styles.topicsContainer} />
      </TopicsContainer>
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
  ),
  device: PropTypes.oneOf(["DESKTOP", null])
};

ShowTopics.defaultProps = {
  device: null,
  topics: null
};

export default ShowTopics;
