import React, { Component } from "react";
import PropTypes from "prop-types";
import StarButton, { starStates } from "@times-components/star-button";
import { SectionContext } from "@times-components/context";

class TileStar extends Component {
  constructor(props) {
    super(props);

    const { articleId, savedArticles } = props;
    this.setStarState(savedArticles, articleId);
  }

  setStarState(savedArticles, articleId) {
    const starState = this.getStarState(savedArticles, articleId);
    this.state = { starState };
  }

  getStarState = (savedArticles, articleId) => {
    const { initial, disabled, selected } = starStates;

    if (!savedArticles) return disabled;
    if (savedArticles && savedArticles[articleId]) return selected;

    return initial;
  };

  onStarPress = () => {
    const { articleId, onArticleSavePress, savedArticles } = this.props;
    this.setStarState(savedArticles, articleId);

    const isSaved = savedArticles && savedArticles[articleId];
    onArticleSavePress(!isSaved, articleId);
  };

  render() {
    const { onArticleSavePress } = this.props;
    const { starState } = this.state;

    return onArticleSavePress ? (
      <StarButton onPress={this.onStarPress} starState={starState} />
    ) : null;
  }
}

const TileStarProvider = ({ articleId }) => (
  <SectionContext.Consumer>
    {({ onArticleSavePress, savedArticles }) => (
      <TileStar
        articleId={articleId}
        onArticleSavePress={onArticleSavePress}
        savedArticles={savedArticles}
      />
    )}
  </SectionContext.Consumer>
);

TileStar.propTypes = {
  articleId: PropTypes.string.isRequired,
  onArticleSavePress: PropTypes.func,
  savedArticles: PropTypes.shape({})
};

TileStar.defaultProps = {
  onArticleSavePress: () => {},
  savedArticles: null
};

TileStarProvider.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default TileStarProvider;
