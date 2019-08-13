import React from "react";
import PropTypes from "prop-types";
import {
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileM = ({ onPress, tile, breakpoint }) => {
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
        starStyle={styles.star}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        tile={tileWithoutLabelAndFlags}
        style={styles.summaryContainer}
        centeredStar
      />
    </TileLink>
  );
};

TileM.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string.isRequired
};

export default withTileTracking(TileM);
