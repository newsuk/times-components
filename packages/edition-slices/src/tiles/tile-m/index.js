/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";
import {
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileM = ({ onPress, tile, breakpoint = editionBreakpoints.small }) => {
  const {
    article: { id, shortHeadline, url }
  } = tile;
  const tileWithoutLabelAndFlags = { article: { id, shortHeadline, url } };
  const styles = styleFactory(breakpoint);

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tileWithoutLabelAndFlags}
    >
      <TileSummary
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        style={styles.summaryContainer}
        tile={tileWithoutLabelAndFlags}
        centeredStar
      />
    </TileLink>
  );
};

TileM.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileM);
