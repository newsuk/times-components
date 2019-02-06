import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileSummary } from "../shared";
import styles from "./styles";

const TileF = ({ tile }) => (
  <View>
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      strapline={tile.strapline}
      summary={tile.article.summary125}
      tile={tile}
    />
  </View>
);

TileF.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileF;
