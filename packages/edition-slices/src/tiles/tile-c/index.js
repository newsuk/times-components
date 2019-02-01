import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileSummary } from "../shared";
import styles from "./styles";

const TileC = ({ tile }) => (
  <View>
    <TileImage
      aspectRatio={16 / 9}
      style={styles.imageContainer}
      uri={tile.article.leadAsset.crop169.url}
    />
    <TileSummary headlineStyle={styles.headline} tile={tile} />
  </View>
);

TileC.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileC;
