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

const TileY = ({ onPress, tile }) => (
  <TileLink
    onPress={onPress}
    style={styles.container}
    tile={tile}
    withStar={false}
  >
    <WithoutWhiteSpace
      render={whiteSpaceHeight => (
        <TileSummary
          headlineStyle={styles.headline}
          summary={getTileSummary(tile, 800)}
          tile={tile}
          withStar
          whiteSpaceHeight={whiteSpaceHeight}
        />
      )}
    />
  </TileLink>
);

TileY.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileY);
