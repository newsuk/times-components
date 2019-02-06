import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileSummary, TileLink } from "../shared";
import styles from "./styles";

const TileL = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary headlineStyle={styles.headlineStyle} tile={tile} />
    </View>
  </TileLink>
);

TileL.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileL;
