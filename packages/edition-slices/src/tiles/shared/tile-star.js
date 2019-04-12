import React from "react";
import PropTypes from "prop-types";
import StarButton from "@times-components/star-button";
import { SectionContext } from "@times-components/context";
import withArticleSaveTracking from "./save-article-tracking-events";

const renderStar = ({ articleId, onArticleSavePress, savedArticles, isDark }) => {
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
};

const StarWithTracking = withArticleSaveTracking(renderStar);

const TileStar = ({ articleId, isDark }) => (
  <SectionContext.Consumer>
    {({ onArticleSavePress, savedArticles }) =>
      onArticleSavePress
        ? <StarWithTracking articleId={articleId} onArticleSavePress={onArticleSavePress} savedArticles={savedArticles} isDark={isDark} />
        : null
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
