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

const TileAS = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop32");

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tile}
      starStyle={styles.star}
    >
      <View style={styles.imageContainer}>
        <Image
          aspectRatio={3 / 2}
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

TileAS.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAS);
