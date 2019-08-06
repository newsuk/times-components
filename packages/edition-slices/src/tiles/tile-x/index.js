/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import editionBreakpoints from "@times-components/styleguide";
import { getTileStrapline, TileLink, TileSummary } from "../shared";
import stylesFactory from "./styles";

const TileX = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const styles = stylesFactory(breakpoint);

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tile}
      starStyle={styles.star}
    >
      <TileSummary
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        summary={tile.teaser300 || tile.article.summary300}
        tile={tile}
        style={styles.summaryContainer}
      />
    </TileLink>
  );
};

TileX.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default TileX;
