import React from "react";
import PropTypes from "prop-types";
import {
  getCrop,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileAC = ({ onPress, tile, breakpoint }) => {
  const styles = styleFactory(breakpoint);
  const { container, headline, imageContainer, summaryContainer } = styles;

  return (
    <TileLink onPress={onPress} style={container} tile={tile}>
      <TileImage
        aspectRatio={16 / 9}
        style={imageContainer}
        uri={getCrop(
          tile.leadAsset || tile.article.listingAsset || tile.article.leadAsset,
          "crop169"
        )}
      />
      <TileSummary
        headlineStyle={headline}
        style={summaryContainer}
        tile={tile}
      />
    </TileLink>
  );
};

TileAC.propTypes = {
  breakpoint: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

TileAC.defaultProps = {
  breakpoint: null
};

export default withTileTracking(TileAC);
