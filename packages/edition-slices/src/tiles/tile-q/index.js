import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImageUri,
  TileLink,
  TileStar,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileQ = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <Image
      aspectRatio={3 / 2}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop32")}
    />
    <TileStar articleId={tile.article.id} style={styles.starButton} />
  </TileLink>
);

TileQ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileQ);
