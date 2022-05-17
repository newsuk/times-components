/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import {
  getTileImage,
  TileLink,
  TileSummary,
  withTileTracking,
  TileImage,
  getTileSummary
} from "../shared";
import stylesFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";

const TileE = ({ onPress, tile, breakpoint = editionBreakpoints.small }) => {
  const crop = getTileImage(tile, "crop45");
  const styles = stylesFactory(breakpoint);

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo }
  } = tile;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileImage
        aspectRatio={4 / 5}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
        hasVideo={hasVideo}
      />
      <WithoutWhiteSpace
        style={styles.summaryContainer}
        render={whiteSpaceHeight => (
          <TileSummary
            headlineStyle={styles.headline}
            summary={getTileSummary(tile, 125)}
            style={styles.summaryContainer}
            tile={tile}
            whiteSpaceHeight={whiteSpaceHeight}
          />
        )}
      />
    </TileLink>
  );
};

TileE.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileE);
