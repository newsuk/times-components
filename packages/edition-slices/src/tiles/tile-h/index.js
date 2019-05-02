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

const TileH = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <TileSummary
      bylines={tile.article.bylines}
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      summary={getTileSummary(tile, 125)}
      tile={tile}
    />
    <Image
      aspectRatio={2 / 3}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop23")}
    />
  </TileLink>
);

TileH.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileH);
