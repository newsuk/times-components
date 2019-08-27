import React from "react";
import PropTypes from "prop-types";
import {
  TileLink,
  TileSummary,
  withTileTracking,
  getTileSummary
} from "../shared";
import styles from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";

const TileAD = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <WithoutWhiteSpace
      style={styles.summaryContainer}
      render={whiteSpaceHeight => (
        <TileSummary
          headlineStyle={styles.headline}
          summary={getTileSummary(tile, 125)}
          tile={tile}
          whiteSpaceHeight={whiteSpaceHeight}
        />
      )}
    />
  </TileLink>
);

TileAD.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAD);
