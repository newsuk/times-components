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

const TileC = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <TileImage
      aspectRatio={16 / 9}
      style={styles.imageContainer}
      uri={getCrop(tile.article.leadAsset, "crop169")}
    />
    <TileSummary headlineStyle={styles.headline} tile={tile} />
  </TileLink>
);

TileC.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileC);
