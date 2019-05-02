import React from "react";
import PropTypes from "prop-types";
import { TileSummary, TileLink, withTileTracking } from "../shared";
import styles from "./styles";

const TileL = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <TileSummary headlineStyle={styles.headlineStyle} tile={tile} />
  </TileLink>
);

TileL.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileL);
