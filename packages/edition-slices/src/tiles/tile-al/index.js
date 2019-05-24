import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImageUri,
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileAL = ({ onPress, tile }) => (
  <TileLink
    onPress={onPress}
    style={styles.container}
    tile={tile}
    starStyle={styles.star}
  >
    <Image
      aspectRatio={3 / 2}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop32")}
    />
    <TileSummary
      headlineStyle={styles.headline}
      summary={getTileSummary(tile, 125)}
      summaryStyle={styles.summaryContainer}
      tile={tile}
    />
  </TileLink>
);

TileAL.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAL);
