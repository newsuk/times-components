import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileSummary } from "../shared";
import styles from "./styles";

const TileA = ({ tile }) => (
  <View>
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
);

TileA.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileA;
