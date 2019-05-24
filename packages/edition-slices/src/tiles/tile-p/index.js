import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImageUri,
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileP = ({ onPress, tile }) => (
  <TileLink
    onPress={onPress}
    style={styles.container}
    tile={tile}
    withStar={false}
  >
    <Image
      aspectRatio={1}
      style={styles.imageContainer}
      uri={getTileImageUri(tile, "crop11")}
      rounded
      resizeMode="cover"
    />
    <TileSummary
      bylines={tile.article.bylines}
      bylineStyle={styles.bylineOpinion}
      headlineStyle={styles.headline}
      strapline={getTileStrapline(tile)}
      straplineStyle={styles.strapline}
      style={styles.summaryContainer}
      starStyle={styles.star}
      tile={tile}
      withStar
    />
  </TileLink>
);

TileP.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileP);
