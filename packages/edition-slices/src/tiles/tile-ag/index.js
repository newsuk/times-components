import React from "react";
import PropTypes from "prop-types";
import {
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileAG = ({ onPress, tile }) => {
  const {
    article: { id, shortHeadline, url }
  } = tile;
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
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAG);
