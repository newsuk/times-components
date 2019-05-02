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

const TileD = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <Image
      aspectRatio={3 / 2}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop32")}
    />
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      tile={tile}
    />
  </TileLink>
);

TileD.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileD);
