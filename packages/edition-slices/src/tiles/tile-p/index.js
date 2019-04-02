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

const TileP = ({ onPress, tile }) => (
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
        byline={tile.article.byline}
        bylineStyle={styles.bylineOpinion}
        headlineStyle={styles.headline}
        strapline={tile.strapline || tile.article.strapline}
        straplineStyle={styles.strapline}
        style={styles.summaryContainer}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileP.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileP);
