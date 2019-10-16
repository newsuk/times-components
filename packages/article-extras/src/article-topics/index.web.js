/* eslint-disable react/require-default-props */
import React, { useContext } from "react";
import ArticleTopics from "@times-components/article-topics";
import Context from "@times-components/context";
import PropTypes from "prop-types";
import { TagList, TagSize, BorderRadiusShape } from "newskit";
import TopicsContainer from "./styles/responsive";
import styles from "./styles";

const ShowTopics = ({ topics = null }) => {
  const { newskit, makeTopicUrl } = useContext(Context);

  if (topics && topics.length > 0) {
    return (
      <TopicsContainer>
        <nav data-cy="topic-tags">
          {newskit ? (
            <TagList
              size={TagSize.Medium}
              shape={BorderRadiusShape.Squares}
              tagData={topics.map(topic => ({
                label: topic.name,
                href: makeTopicUrl(topic)
              }))}
            />
          ) : (
            <ArticleTopics style={styles.topicsContainer} topics={topics} />
          )}
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

export default ShowTopics;
