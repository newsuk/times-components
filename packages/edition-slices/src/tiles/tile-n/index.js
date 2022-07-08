/* eslint-disable react/require-default-props */
import React from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { colours, editionBreakpoints } from "@times-components/ts-styleguide";
import {
  getTileImage,
  getTileStrapline,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileN = ({ onPress, tile, breakpoint = editionBreakpoints.small }) => {
  const styles = styleFactory(breakpoint);
  const crop = getTileImage(tile, "crop11");
  const strapline =
    breakpoint !== editionBreakpoints.huge ? getTileStrapline(tile) : null;

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo }
  } = tile;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TcView style={styles.content}>
        <TileImage
          aspectRatio={1}
          relativeWidth={crop.relativeWidth}
          relativeHeight={crop.relativeHeight}
          relativeHorizontalOffset={crop.relativeHorizontalOffset}
          relativeVerticalOffset={crop.relativeVerticalOffset}
          style={styles.imageContainer}
          uri={crop.url}
          fill
          hasVideo={hasVideo}
        />
        <TileSummary
          flagColour={styles.flagColour}
          headlineStyle={styles.headline}
          labelColour={colours.functional.greyLabel}
          strapline={strapline}
          straplineStyle={styles.strapline}
          style={styles.summaryContainer}
          tile={tile}
        />
      </TcView>
    </TileLink>
  );
};

TileN.propTypes = {
  onPress: PropTypes.func.isRequired,
  breakpoint: PropTypes.string,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileN);
