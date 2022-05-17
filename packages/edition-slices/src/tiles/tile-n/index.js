/* eslint-disable react/require-default-props */
import React from "react";
import { View } from "react-native";
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
import PositionedTileStar from "../shared/positioned-tile-star";

const TileN = ({
  isDarkStar,
  onPress,
  tile,
  breakpoint = editionBreakpoints.small
}) => {
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
      <View style={styles.content}>
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
          withStar={breakpoint === editionBreakpoints.huge}
        />
      </View>
      {breakpoint !== editionBreakpoints.huge ? (
        <PositionedTileStar
          articleId={tile.article.id}
          isDarkStar={isDarkStar}
        />
      ) : null}
    </TileLink>
  );
};

TileN.propTypes = {
  isDarkStar: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  breakpoint: PropTypes.string,
  tile: PropTypes.shape({}).isRequired
};

TileN.defaultProps = {
  isDarkStar: true
};

export default withTileTracking(TileN);
