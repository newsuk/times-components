import React from "react";
import PropTypes from "prop-types";
import StarButton from "@times-components/star-button";
import { SectionContext } from "@times-components/context";

const renderStar = (articleId, onArticleSavePress, savedArticles) => {
  const disabled = !savedArticles;
  const isSaved = savedArticles && savedArticles[articleId];

  const onStarPress = () => {
    onArticleSavePress(!isSaved, articleId);
  };

  return (
    <StarButton disabled={disabled} onPress={onStarPress} selected={isSaved} />
  );
};

const TileStar = ({ articleId }) => (
  <SectionContext.Consumer>
    {({ onArticleSavePress, savedArticles }) =>
      onArticleSavePress
        ? renderStar(articleId, onArticleSavePress, savedArticles)
        : null
    }
  </SectionContext.Consumer>
);

TileStar.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default TileStar;
