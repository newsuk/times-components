import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImage,
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";

const TileW = ({ onPress, tile, breakpoint }) => {
  const styles = stylesFactory(breakpoint);
  const crop = getTileImage(tile, "crop169");

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
        summary={getTileSummary(tile, 125)}
        summaryStyle={styles.summary}
        tile={tile}
        withStar
      />
      <Image
        aspectRatio={16 / 9}
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

TileW.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string.isRequired
};

export default withTileTracking(TileW);
