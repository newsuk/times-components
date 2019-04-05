import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import {
  getTileImageUri,
  getTileStrapline,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileN = ({ isDarkStar, onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={1}
        style={styles.imageContainer}
        uri={getTileImageUri(tile, "crop11")}
      />
      <TileSummary
        flagColour={styles.flagColour}
        headlineStyle={styles.headline}
        isDarkStar={isDarkStar}
        labelColour={colours.functional.greyLabel}
        strapline={getTileStrapline(tile)}
        style={styles.summaryContainer}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileN.propTypes = {
  isDarkStar: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

TileN.defaultProps = {
  isDarkStar: true
};

export default withTileTracking(TileN);
