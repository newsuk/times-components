import React from "react";
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
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <TileSummary
      headlineStyle={styles.headline}
      strapline={getTileStrapline(tile)}
      summary={getTileSummary(tile, 125)}
      tile={tile}
      summaryStyle={styles.summaryContainer}
    />
  </TileLink>
);

TileF.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileF);
