import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { getTileImage, TileLink, withTileTracking } from "../shared";
import styles from "./styles";

const TileAI = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop32");

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <Image
        aspectRatio={3 / 2}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
      />
    </TileLink>
  );
};

TileAI.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAI);
