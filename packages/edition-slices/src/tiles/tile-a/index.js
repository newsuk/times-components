import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImageUri,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileA = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      tile={tile}
    />
    <Image
      aspectRatio={16 / 9}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop169")}
    />
  </TileLink>
);

TileA.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileA);
