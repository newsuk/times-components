import React from "react";
import PropTypes from "prop-types";
import {
  getTileImage,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileJ = ({ onPress, tile }) => {
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
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
      />
    </TileLink>
  );
};

TileJ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileJ);
