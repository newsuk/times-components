import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileZ = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop45");

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileSummary
        headlineStyle={styles.headline}
        tile={tile}
        style={styles.summaryContainer}
      />
      <Image
        aspectRatio={4 / 5}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        uri={crop.url}
        fill
      />
    </TileLink>
  );
};

TileZ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileZ);
