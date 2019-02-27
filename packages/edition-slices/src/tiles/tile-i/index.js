import React from "react";
import PropTypes from "prop-types";
import {
  getCrop,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileI = ({ onPress, style, tile }) => {
  const { headline, imageContainer, summaryContainer } = styles;

  return (
    <TileLink onPress={onPress} style={style.container} tile={tile}>
      <TileImage
        aspectRatio={16 / 9}
        style={imageContainer}
        uri={getCrop(tile.article.leadAsset, "crop169")}
      />
      <TileSummary
        headlineStyle={{ ...headline, ...style.headline }}
        style={summaryContainer}
        tile={tile}
      />
    </TileLink>
  );
};

TileI.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  tile: PropTypes.shape({}).isRequired
};

TileI.defaultProps = {
  style: {}
};

export default withTileTracking(TileI);
