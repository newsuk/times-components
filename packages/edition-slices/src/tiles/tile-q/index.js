import React from "react";
import PropTypes from "prop-types";
import { getTileImage, TileLink, withTileTracking, TileImage } from "../shared";
import styles from "./styles";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileQ = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop32");

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo }
  } = tile;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileImage
        aspectRatio={3 / 2}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
        hasVideo={hasVideo}
      />
      <PositionedTileStar articleId={tile.article.id} centeredStar />
    </TileLink>
  );
};

TileQ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileQ);
