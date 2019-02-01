import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileSummary } from "../shared";
import styles from "./styles";

const TileD = ({ tile }) => (
  <View style={styles.container}>
    <TileImage
      aspectRatio={3 / 2}
      style={styles.imageContainer}
      uri={tile.article.leadAsset.crop32.url}
    />
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      tile={tile}
    />
  </View>
);

TileD.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileD;
