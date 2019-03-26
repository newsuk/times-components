import React from "react";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import { SectionContext } from "@times-components/context";

const renderStar = (onSaveStarPress, savedArticles, articleId) => {
  const isInactive = !savedArticles;
  const isSaved = savedArticles && savedArticles[articleId];
  const getTitle = () => {
    if (isInactive) {
      return "Inactive";
    } if (isSaved) {
      return "Unsave";
    }
    return "Save";
  };

  return (<Button disabled={isInactive} onPress={() => onSaveStarPress(!isSaved, articleId)} style={{ width: 100 }} title={getTitle()} />);
}

const TileStar = ({ articleId }) => (
  <SectionContext.Consumer>
    {({ onSaveStarPress, savedArticles }) => onSaveStarPress ? renderStar(onSaveStarPress, savedArticles, articleId) : null}
  </SectionContext.Consumer>
);

TileStar.propTypes = {
  articleId: PropTypes.string.isRequired
}

export default TileStar;
