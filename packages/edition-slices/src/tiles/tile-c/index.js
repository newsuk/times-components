import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileC = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={16 / 9}
        style={styles.imageContainer}
        uri={tile.article.leadAsset.crop169.url}
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
