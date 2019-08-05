/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import editionBreakpoints from "@times-components/styleguide";
import {
  getTileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";

const TileG = ({ onPress, tile, breakpoint = editionBreakpoints.small }) => {
  const crop = getTileImage(tile, "crop11");
  const styles = stylesFactory(breakpoint);

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <Image
        aspectRatio={1}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        rounded
        resizeMode="cover"
      />
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
      />
    </TileLink>
  );
};

TileG.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileG);
