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

const TileZ = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <TileSummary headlineStyle={styles.headline} tile={tile} />
    <Image aspectRatio={4 / 5} uri={getTileImageUri(tile, "crop45")} />
  </TileLink>
);

TileZ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileZ);
