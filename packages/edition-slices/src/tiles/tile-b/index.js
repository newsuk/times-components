import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileB = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary
        headlineStyle={styles.headline}
        summary={tile.article.summary125}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileB.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileB;
