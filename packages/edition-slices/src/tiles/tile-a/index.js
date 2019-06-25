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

const TileA = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop169");
  return (
    <TileLink
      onPress={onPress}
      tile={tile}
      withStar={false}
      style={styles.labelLink}
    >
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
        withStar
      />
      <Image
        aspectRatio={16 / 9}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
      />
    </TileLink>
  );
};
TileA.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileA);
