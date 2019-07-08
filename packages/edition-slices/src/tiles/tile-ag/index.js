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
import stylesFactory from "./styles";

const TileAG = ({ onPress, tile, breakpoint = editionBreakpoints.wide }) => {
  const {
    article: { id, shortHeadline, url }
  } = tile;
  const styles = stylesFactory(breakpoint);
  const tileWithoutLabelAndFlags = { article: { id, shortHeadline, url } };

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tileWithoutLabelAndFlags}
      starStyle={styles.star}
    >
      <TileSummary
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        tile={tileWithoutLabelAndFlags}
      />
    </TileLink>
  );
};

TileAG.propTypes = {
  breakpoint: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAG);
