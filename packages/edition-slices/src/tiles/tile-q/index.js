import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileLink } from "../shared";
import styles from "./styles";

const TileQ = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={3 / 2}
        style={styles.imageContainer}
        uri={tile.article.leadAsset.crop32.url}
      />
    </View>
  </TileLink>
);

TileQ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileQ;
