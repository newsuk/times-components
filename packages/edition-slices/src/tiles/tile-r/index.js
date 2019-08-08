import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { editionBreakpoints } from "@times-components/styleguide";
import {
  getTileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";

const TileR = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const styles = stylesFactory(breakpoint);
  const crop = getTileImage(tile, "crop169");

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileSummary headlineStyle={styles.headline} tile={tile} />
      <Image
        aspectRatio={16 / 9}
        uri={crop.url}
        fill
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
      />
    </TileLink>
  );
};

TileR.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileR);
