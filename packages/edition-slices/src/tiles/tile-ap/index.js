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

const TileAP = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <Image
      aspectRatio={1}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop11")}
      rounded
      resizeMode="cover"
    />
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      tile={tile}
    />
  </TileLink>
);

TileAP.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAP);
