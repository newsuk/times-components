/* eslint-disable react/require-default-props */
import React from "react";
import { View } from "react-native";
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
import styles from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileU = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const crop = getTileImage(tile, "crop169");
  const summary =
    breakpoint === editionBreakpoints.medium ? getTileSummary(tile, 300) : null;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <View style={styles.summaryContainer}>
        <WithoutWhiteSpace
          render={whiteSpaceHeight => (
            <TileSummary
              headlineStyle={styles.headline}
              summary={summary}
              tile={tile}
              whiteSpaceHeight={whiteSpaceHeight}
              linesOfTeaserToRender={3}
              withStar={false}
            />
          )}
        />
        <PositionedTileStar articleId={tile.article.id} />
      </View>

      <Image
        aspectRatio={16 / 9}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
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
