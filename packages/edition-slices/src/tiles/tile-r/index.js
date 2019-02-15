import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileR = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
      />
      <TileImage
        aspectRatio={16 / 9}
        style={styles.imageContainer}
        uri={tile.article.leadAsset.crop169.url}
      />
    </View>
  </TileLink>
);

TileR.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileR;
