import React from "react";
import PropTypes from "prop-types";
import {
  getTileImageUri,
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
      uri={getTileImageUri(tile, "crop169")}
    />
    <TileSummary
      headlineStyle={styles.headline}
      starStyle={styles.star}
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
