import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileSummary } from "../shared";
import styles from "./styles";

const TileB = ({ tile }) => (
  <View>
    <TileSummary
      headlineStyle={styles.headline}
      style={styles.summaryContainer}
      summary={tile.article.summary125}
      tile={tile}
    />
  </View>
);

TileB.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileB;
