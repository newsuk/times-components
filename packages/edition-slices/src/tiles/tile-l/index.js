import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileSummary } from "../shared";
import styles from "./styles";

const TileL = ({ tile }) => (
  <View style={styles.container}>
    <TileSummary headlineStyle={styles.headlineStyle} tile={tile} />
  </View>
);

TileL.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileL;
