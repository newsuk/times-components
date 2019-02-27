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

const TileJ = ({ onPress, style, tile }) => {
  const { container, headline, imageContainer, summaryContainer } = styles;

  return (
    <TileLink onPress={onPress} tile={tile}>
      <View style={container}>
        <TileImage
          aspectRatio={3 / 2}
          style={imageContainer}
          uri={getCrop(tile.article.leadAsset, "crop32")}
        />
        <TileSummary
          headlineStyle={{ ...headline, ...style.headline }}
          style={summaryContainer}
          tile={tile}
        />
      </View>
    </TileLink>
  );
};

TileJ.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  tile: PropTypes.shape({}).isRequired
};

TileJ.defaultProps = {
  style: {}
};

export default withTileTracking(TileJ);
