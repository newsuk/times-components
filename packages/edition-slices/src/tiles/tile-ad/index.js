import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  getCrop,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileAD = ({ onPress, tile }) => {
  const { container, headline, imageContainer, summaryContainer } = styles;

  return (
    <TileLink onPress={onPress} tile={tile}>
      <View style={container}>
        <TileImage
          aspectRatio={3 / 2}
          style={imageContainer}
          uri={getCrop(
            tile.leadAsset ||
              tile.article.listingAsset ||
              tile.article.leadAsset,
            "crop32"
          )}
        />
        <TileSummary
          headlineStyle={headline}
          style={summaryContainer}
          tile={tile}
        />
      </View>
    </TileLink>
  );
};

TileAD.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAD);
