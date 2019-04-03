import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  getTileImageUri,
  TileImage,
  TileLink,
  TileStar,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileQ = ({ onPress, tile }) => {

  const onArticleSavePress = () => {};
  const savedArticles = [{1: true}];

  return (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={3 / 2}
        style={styles.imageContainer}
        uri={getTileImageUri(tile, "crop32")}
      />
      <SectionContext.Provider
        value={{
          onArticleSavePress,
          savedArticles
        }}
      >
        <View style={styles.starButton}>
          <TileStar articleId="1" />
        </View>
      </SectionContext.Provider>
      </View>
  </TileLink>
)};

TileQ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileQ);
