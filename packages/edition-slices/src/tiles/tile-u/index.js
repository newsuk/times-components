/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { editionBreakpoints } from "@times-components/styleguide";
import {
  getTileImage,
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileU = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const styles = styleFactory(breakpoint);
  const crop = getTileImage(tile, "crop32");

  const teaserLength = {
    [editionBreakpoints.wide]: 125,
    [editionBreakpoints.huge]: 300
  };
  const summary =
    breakpoint !== editionBreakpoints.medium
      ? getTileSummary(tile, teaserLength[breakpoint])
      : null;

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tile}
      withStar={false}
    >
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        summary={summary}
        tile={tile}
        withStar
        starStyle={styles.star}
      />
      <Image
        aspectRatio={3 / 2}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
      />
    </TileLink>
  );
};

TileU.propTypes = {
  breakpoint: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileU);
