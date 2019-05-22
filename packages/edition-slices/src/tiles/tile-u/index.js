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

const TileU = ({ onPress, tile }) => (
  <TileLink
    onPress={onPress}
    style={styles.container}
    tile={tile}
    withStar={false}
  >
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      tile={tile}
      withStar
    />
    <Image
      aspectRatio={3 / 2}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop32")}
    />
  </TileLink>
);

TileU.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileU);
