import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import {
  getTileImageUri,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileZ = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary headlineStyle={styles.headline} tile={tile} />
      <TileImage aspectRatio={4 / 5} uri={getTileImageUri(tile, "crop45")} />
    </View>
  </TileLink>
);

TileZ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileZ);
