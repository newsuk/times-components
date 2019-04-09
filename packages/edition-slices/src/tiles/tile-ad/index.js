import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";
import {
  getCrop,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileAD = ({ onPress, tile, breakpoint }) => {
  const styles = styleFactory(breakpoint);
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
  breakpoint: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

TileAD.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default withTileTracking(TileAD);
