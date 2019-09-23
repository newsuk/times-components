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
import styleFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileAB = ({ onPress, tile, breakpoint = editionBreakpoints.medium }) => {
  const styles = styleFactory(breakpoint);
  const crop = getTileImage(tile, "crop23");

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <Image
        aspectRatio={2 / 3}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
      />
      <View style={styles.summaryContainer}>
        <WithoutWhiteSpace
          render={whiteSpaceHeight => (
            <TileSummary
              headlineStyle={styles.headline}
              summary={getTileSummary(tile, 800)}
              tile={tile}
              whiteSpaceHeight={whiteSpaceHeight}
              withStar={false}
            />
          )}
        />
        <PositionedTileStar articleId={tile.article.id} />
      </View>
    </TileLink>
  );
};

TileAB.propTypes = {
  breakpoint: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAB);
