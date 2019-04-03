import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import {
  getCrop,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileN = ({ onPress, tile }) => (
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
        flagColour={styles.flagColour}
        headlineStyle={styles.headline}
        labelColour={colours.functional.greyLabel}
        strapline={tile.strapline || tile.article.strapline}
        style={styles.summaryContainer}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileN.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileN);
