import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  getTileImageUri,
  getTileSummary,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileAL = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={3 / 2}
        style={styles.imageContainer}
        uri={getTileImageUri(tile, "crop32")}
      />
      <TileSummary
        headlineStyle={styles.headline}
        summary={getTileSummary(tile, 125)}
        summaryStyle={styles.summaryContainer}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileAL.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAL);
