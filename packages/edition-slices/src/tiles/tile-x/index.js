import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { getTileStrapline, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileX = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        summary={tile.teaser300 || tile.article.summary300}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileX.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileX;
