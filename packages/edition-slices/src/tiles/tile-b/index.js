import React from "react";
import PropTypes from "prop-types";
import {
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileB = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <TileSummary
      headlineStyle={styles.headline}
      summary={getTileSummary(tile, 125)}
      tile={tile}
    />
  </TileLink>
);

TileB.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileB);
