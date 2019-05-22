import React from "react";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { TileSummary, TileLink, withTileTracking } from "../shared";
import styles from "./styles";

const TileO = ({ isDarkStar, onPress, tile }) => (
  <TileLink
    onPress={onPress}
    style={styles.container}
    tile={tile}
    isDarkStar={isDarkStar}
  >
    <TileSummary
      flagColour={styles.flagColour}
      headlineStyle={styles.headlineStyle}
      labelColour={colours.functional.greyLabel}
      tile={tile}
    />
  </TileLink>
);

TileO.propTypes = {
  isDarkStar: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

TileO.defaultProps = {
  isDarkStar: true
};

export default withTileTracking(TileO);
