import React from "react";
import PropTypes from "prop-types";
import { TileImage, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileD = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <TileImage
      aspectRatio={3 / 2}
      style={styles.imageContainer}
      uri={tile.article.leadAsset.crop32.url}
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

export default TileD;
