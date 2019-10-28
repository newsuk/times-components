/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";
import {
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileB = ({
  onPress,
  tile,
  breakpoint = editionBreakpoints.small,
  withMoreTeaser = false,
  additionalHeadlineStyles = {}
}) => {
  const styles = stylesFactory(breakpoint);
  const headLineStyles = {
    ...styles.headline,
    ...additionalHeadlineStyles
  };

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <WithoutWhiteSpace
        style={styles.summaryContainer}
        render={whiteSpaceHeight => (
          <TileSummary
            headlineStyle={headLineStyles}
            summary={getTileSummary(tile, withMoreTeaser ? 800 : 125)}
            summaryStyle={styles.summary}
            tile={tile}
            whiteSpaceHeight={whiteSpaceHeight}
            withStar={false}
          />
        )}
      />
      <PositionedTileStar articleId={tile.article.id} />
    </TileLink>
  );
};

TileB.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
  withMoreTeaser: PropTypes.bool,
  additionalHeadlineStyles: PropTypes.shape({})
};

export default withTileTracking(TileB);
