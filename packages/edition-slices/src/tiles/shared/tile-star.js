import React from "react";
import PropTypes from "prop-types";
import StarButton from "@times-components/star-button";
import { SectionContext } from "@times-components/context";
import withArticleSaveTracking from "./save-article-tracking-events";

const StarWithTracking = withArticleSaveTracking(
  ({ articleId, onArticleSavePress, savedArticles, isDark }) => {
    const disabled = !savedArticles;
    const isSaved = savedArticles && savedArticles[articleId];

    const onStarPress = () => {
      onArticleSavePress(!isSaved, articleId);
    };

    return (
      <StarButton
        disabled={disabled}
        isDark={isDark}
        onPress={onStarPress}
        selected={isSaved}
      />
    );
  }
);

const TileStar = ({ articleId, isDark }) => (
  <SectionContext.Consumer>
    {({ onArticleSavePress, savedArticles }) =>
      onArticleSavePress ? (
        <StarWithTracking
          articleId={articleId}
          isDark={isDark}
          onArticleSavePress={onArticleSavePress}
          savedArticles={savedArticles}
        />
      ) : null
    }
  </SectionContext.Consumer>
);

TileStar.propTypes = {
  articleId: PropTypes.string.isRequired,
  isDark: PropTypes.bool
};

TileStar.defaultProps = {
  isDark: false
};

export default TileStar;
