import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";
import {
  getTileImageUri,
  TileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileK = ({ onPress, tile, breakpoint }) => {
  const styles = styleFactory(breakpoint);
  return (
    <TileLink onPress={onPress} tile={tile}>
      <View style={styles.container}>
        <TileImage
          aspectRatio={3 / 2}
          style={styles.imageContainer}
          uri={getTileImageUri(tile, "crop32")}
        />
        <TileSummary
          headlineStyle={styles.headline}
          style={styles.summaryContainer}
          tile={tile}
        />
      </View>
    </TileLink>
  );
};

TileK.propTypes = {
  breakpoint: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

TileK.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default withTileTracking(TileK);
