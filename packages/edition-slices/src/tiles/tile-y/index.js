import React from "react";
import PropTypes from "prop-types";
import { TileLink, TileSummary, withTileTracking } from "../shared";
import styles from "./styles";

const TileY = ({ onPress, tile }) => (
  <TileLink
    onPress={onPress}
    style={styles.container}
    tile={tile}
    withStar={false}
  >
    <TileSummary
      headlineStyle={styles.headline}
      summary={tile.teaser300 || tile.article.summary300}
      tile={tile}
      withStar
    />
  </TileLink>
);

TileY.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileY);
