import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileM = ({ onPress, tile }) => {
  const {
    strapline,
    article: { shortHeadline }
  } = tile;
  const newTile = { article: { shortHeadline } };

  return (
    <TileLink onPress={onPress} tile={newTile}>
      <View style={styles.container}>
        <TileSummary
          headlineStyle={styles.headlineStyle}
          strapline={strapline}
          straplineStyle={styles.straplineStyle}
          tile={newTile}
        />
      </View>
    </TileLink>
  );
};

TileM.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileM;
