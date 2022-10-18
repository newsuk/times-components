import React from "react";
import PropTypes from "prop-types";
import ArticleTopics from "@times-components/article-topics";
import UserState from "@times-components/user-state";
import styles from "../styles/article-topics";

const ShowTopics = ({ topics }) => {
  if (topics && topics.length > 0) {
    return (
      <UserState state={UserState.showTopicTags}>
        <nav>
          <ArticleTopics style={styles.topicsMetaContainer} topics={topics} />
        </nav>
      </UserState>
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
