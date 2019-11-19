import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  getTileImage,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileC = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop169");

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo }
  } = tile;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <View style={styles.imageContainer}>
        <TileImage
          aspectRatio={16 / 9}
          uri={crop.url}
          fill
          relativeWidth={crop.relativeWidth}
          relativeHeight={crop.relativeHeight}
          relativeHorizontalOffset={crop.relativeHorizontalOffset}
          relativeVerticalOffset={crop.relativeVerticalOffset}
          hasVideo={hasVideo}
        />
      </View>
      <TileSummary
        headlineStyle={styles.headline}
        tile={tile}
        style={styles.summaryContainer}
      />
    </TileLink>
  );
};

TileC.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileC);
