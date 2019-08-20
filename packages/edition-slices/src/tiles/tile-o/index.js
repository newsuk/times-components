import React from "react";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { TileSummary, TileLink, withTileTracking } from "../shared";
import stylesFactory from "./styles";

const TileO = ({ isDarkStar, onPress, tile, breakpoint }) => {
  const styles = stylesFactory(breakpoint);
  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileSummary
        flagColour={styles.flagColour}
        headlineStyle={styles.headlineStyle}
        labelColour={colours.functional.greyLabel}
        tile={tile}
        style={styles.summaryContainer}
        isDarkStar={isDarkStar}
      />
    </TileLink>
  );
};

TileO.propTypes = {
  isDarkStar: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string.isRequired
};

TileO.defaultProps = {
  isDarkStar: true
};

export default withTileTracking(TileO);
