import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { getCrop, TileImage, TileLink, withTileTracking } from "../shared";
import styles from "./styles";

const TileQ = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={3 / 2}
        style={styles.imageContainer}
        uri={getCrop(tile.article.leadAsset, "crop32")}
      />
    </View>
  </TileLink>
);

TileQ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileQ);
