import React from "react";
import PropTypes from "prop-types";
import { TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileF = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <TileSummary
      headlineStyle={styles.headline}
      strapline={tile.strapline}
      style={styles.summaryContainer}
      summary={tile.article.summary125}
      tile={tile}
    />
  </TileLink>
);

TileF.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileF;
