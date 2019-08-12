/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import editionBreakpoints from "@times-components/styleguide";
import {
  getTileStrapline,
  TileLink,
  TileSummary,
  getTileSummary
} from "../shared";
import stylesFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";

const TileX = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const styles = stylesFactory(breakpoint);

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tile}
      starStyle={styles.star}
    >
      <WithoutWhiteSpace
        render={whiteSpaceHeight => (
          <TileSummary
            style={styles.summaryContainer}
            headlineStyle={styles.headline}
            strapline={getTileStrapline(tile)}
            straplineStyle={styles.strapline}
            summary={getTileSummary(tile, 800)}
            tile={tile}
            whiteSpaceHeight={whiteSpaceHeight}
          />
        )}
      />
    </TileLink>
  );
};

TileX.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default TileX;
