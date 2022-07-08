/* eslint-disable react/require-default-props */
import React from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import {
  getTileImage,
  getTileSummary,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking
} from "../shared";
import stylesResolver from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";

const TileAR = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const crop = getTileImage(tile, "crop169");
  const styles = stylesResolver(breakpoint);

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo }
  } = tile;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TcView style={styles.imageContainer}>
        <TileImage
          aspectRatio={16 / 9}
          uri={crop.url}
          fill
          relativeWidth={crop.relativeWidth}
          relativeHeight={crop.relativeHeight}
          relativeHorizontalOffset={crop.relativeHorizontalOffset}
          relativeVerticalOffset={crop.relativeVerticalOffset}
          hasVideo={hasVideo}
        />
      </TcView>
      <WithoutWhiteSpace
        render={whiteSpaceHeight => (
          <TileSummary
            headlineStyle={styles.headline}
            summary={getTileSummary(tile, 125)}
            summaryStyle={styles.summary}
            tile={tile}
            whiteSpaceHeight={whiteSpaceHeight}
            withStar={false}
          />
        )}
      />
    </TileLink>
  );
};

TileAR.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileAR);
