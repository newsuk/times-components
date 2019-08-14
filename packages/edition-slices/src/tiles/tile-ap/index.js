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

const TileAP = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop11");

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <Image
        aspectRatio={1}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
        rounded
        resizeMode="cover"
      />
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
      />
    </TileLink>
  );
};

TileAP.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAP);
