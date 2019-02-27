import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileLink, TileSummary, withTileTracking } from "../shared";
import styles from "./styles";

const TileY = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary
        headlineStyle={styles.headline}
        summary={tile.article.summary300}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileY.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileY);
