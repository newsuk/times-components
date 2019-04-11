import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  getTileSummary,
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileF = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        summary={getTileSummary(tile, 125)}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileF.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileF);
