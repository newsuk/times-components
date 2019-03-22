import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  getCrop,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileV = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={16 / 9}
        style={styles.imageContainer}
        uri={getCrop(tile.leadAsset || tile.article.leadAsset, "crop169")}
      />
      <TileSummary headlineStyle={styles.headline} tile={tile} />
    </View>
  </TileLink>
);

TileV.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileV);
