import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { getCrop, TileImage, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileU = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
      />
      <TileImage
        aspectRatio={3 / 2}
        style={styles.imageContainer}
        uri={getCrop(tile.article.leadAsset, "crop32")}
      />
    </View>
  </TileLink>
);

TileU.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileU;
