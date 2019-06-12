import React from "react";
import ArticleTopics from "@times-components/article-topics";
import UserState from "@times-components/user-state";
import PropTypes from "prop-types";
import styles from "../styles/article-topics";
import TopicsMetaContainer from "../styles/article-topics/responsive";

const ShowTopics = ({ topics }) => {
  if (topics && topics.length > 0) {
    return (
      <UserState state={UserState.loggedInOrShared}>
        <TopicsMetaContainer>
          <nav>
            <ArticleTopics style={styles.topicsMetaContainer} topics={topics} />
          </nav>
        </TopicsMetaContainer>
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
