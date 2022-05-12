/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { TileSummary, TileLink, withTileTracking } from "../shared";
import stylesFactory from "./styles";

const TileL = ({ onPress, tile, breakpoint = editionBreakpoints.small }) => {
  const styles = stylesFactory(breakpoint);

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileSummary
        headlineStyle={styles.headlineStyle}
        tile={tile}
        style={styles.summaryContainer}
      />
    </TileLink>
  );
};

TileL.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileL);
