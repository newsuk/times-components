/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";
import {
  getTileImage,
  getTileStrapline,
  TileLink,
  TileImage,
  TileSummary,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";

const TileAH = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const crop = getTileImage(tile, "crop11");
  const styles = stylesFactory(breakpoint);

  if (!crop) {
    return null;
  }

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileImage
        aspectRatio={1}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
        rounded
        resizeMode="cover"
      />
      <TileSummary
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        style={styles.summaryContainer}
        tile={tile}
        centeredStar
      />
    </TileLink>
  );
};

TileAH.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileAH);
