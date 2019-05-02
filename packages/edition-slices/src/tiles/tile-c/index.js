import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImageUri,
  TileLink,
  TileStar,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileC = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <Image
      aspectRatio={16 / 9}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop169")}
    />
    <TileSummary headlineStyle={styles.headline} tile={tile} withStar={false} />
    <TileStar articleId={tile.article.id} style={styles.star}/>
  </TileLink>
);

TileC.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileC);
