import React from "react";
import ArticleTopics from "@times-components/article-topics";
import Context from "@times-components/context";
import PropTypes from "prop-types";
import {
  ThemeProvider,
  TagList,
  TagSize,
  lightTheme,
  BorderRadiusShape
} from "newskit";
import TopicsContainer from "./styles/responsive";
import styles from "./styles";

const ShowTopics = ({ topics }) => {
  if (topics && topics.length > 0) {
    return (
      <TopicsContainer>
        <nav data-cy="topic-tags">
          <Context.Consumer>
            {({ newskit, makeTopicUrl }) => {
              if (newskit) {
                return (
                  <ThemeProvider theme={lightTheme}>
                    <TagList
                      size={TagSize.Medium}
                      shape={BorderRadiusShape.Squares}
                      tagData={topics.map(topic => ({
                        label: topic.name,
                        href: makeTopicUrl(topic)
                      }))}
                    />
                  </ThemeProvider>
                );
              }

              return (
                <ArticleTopics style={styles.topicsContainer} topics={topics} />
              );
            }}
          </Context.Consumer>
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
