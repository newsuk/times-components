import React from "react";
import ArticleTopics from "@times-components/article-topics";
import PropTypes from "prop-types";
import styles from "../styles/article-topics";
import TopicsContainer from "../styles/article-topics/responsive";

const ShowTopics = ({ topics }) => {
  if (topics && topics.length > 0) {
    return (
      <TopicsContainer>
        <nav>
          <ArticleTopics style={styles.topicsContainer} topics={topics} />
        </nav>
      </TopicsContainer>
    );
  }

  return null;
};

ShowTopics.propTypes = {
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
