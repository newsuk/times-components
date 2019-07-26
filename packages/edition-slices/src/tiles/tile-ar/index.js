import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImage,
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileAR = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop169");

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tile}
      starStyle={styles.star}
    >
      <View style={styles.imageContainer}>
        <Image
          aspectRatio={16 / 9}
          uri={crop.url}
          relativeWidth={crop.relativeWidth}
          relativeHeight={crop.relativeHeight}
          relativeHorizontalOffset={crop.relativeHorizontalOffset}
          relativeVerticalOffset={crop.relativeVerticalOffset}
        />
      </View>
      <TileSummary
        headlineStyle={styles.headline}
        summary={getTileSummary(tile, 125)}
        tile={tile}
      />
    </TileLink>
  );
};

TileAR.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAR);
