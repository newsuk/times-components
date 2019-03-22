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

const TileT = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={16 / 9}
        style={styles.imageContainer}
        uri={getCrop(tile.leadAsset || tile.article.leadAsset, "crop169")}
      />
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileT.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileT);
