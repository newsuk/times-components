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

const TileAN = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={1}
        style={styles.imageContainer}
        uri={getCrop(
          tile.leadAsset || tile.article.listingAsset || tile.article.leadAsset,
          "crop11"
        )}
      />
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        summary={tile.teaser125 || tile.article.summary125}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileAN.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAN);
