import React from "react";
import PropTypes from "prop-types";
import StarButton from "@times-components/star-button";
import { SectionContext } from "@times-components/context";
import withArticleSaveTracking from "./save-article-tracking-events";

const StarWithTracking = withArticleSaveTracking(
  ({ articleId, onArticleSavePress, savedArticles, isDark, style }) => {
    const disabled = !savedArticles;
    const isSaved = savedArticles && savedArticles[articleId];

    const onStarPress = () => {
      onArticleSavePress(!isSaved, articleId);
    };

    return (
      <StarButton
        style={style}
        disabled={disabled}
        isDark={isDark}
        onPress={onStarPress}
        selected={isSaved}
      />
    );
  }
);

const TileStar = ({ articleId, isDark, style }) => (
  <SectionContext.Consumer>
    {({ onArticleSavePress, savedArticles }) =>
      onArticleSavePress ? (
        <StarWithTracking
          style={style}
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
  style: PropTypes.shape({}),
  isDark: PropTypes.bool
};

TileStar.defaultProps = {
  style: null,
  isDark: false
};

export default TileStar;
