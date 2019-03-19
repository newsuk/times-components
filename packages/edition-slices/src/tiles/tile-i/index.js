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

const TileI = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <TileImage
      aspectRatio={16 / 9}
      style={styles.imageContainer}
      uri={getCrop(tile.leadAsset || tile.article.leadAsset, "crop169")}
    />
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      tile={tile}
    />
  </TileLink>
);

TileI.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileI);
