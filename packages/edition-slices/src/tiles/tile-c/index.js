import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { getCrop, TileImage, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileC = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={16 / 9}
        style={styles.imageContainer}
        uri={getCrop(tile.article.leadAsset, "crop169")}
      />
      <TileSummary headlineStyle={styles.headline} tile={tile} />
    </View>
  </TileLink>
);

TileC.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileC;
