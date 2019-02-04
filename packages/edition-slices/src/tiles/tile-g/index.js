import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileSummary } from "../shared";
import styles from "./styles";

const TileG = ({ tile }) => (
  <View style={styles.container}>
    <TileImage
      aspectRatio={1}
      style={styles.imageContainer}
      uri={tile.article.leadAsset.crop11.url}
    />
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      tile={tile}
    />
  </View>
);

TileG.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileG;
