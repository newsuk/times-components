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
import stylesFactory from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileAL = ({ onPress, tile, breakpoint = editionBreakpoints.wide }) => {
  const crop = getTileImage(tile, "crop32");
  const styles = stylesFactory(breakpoint);

  if (!crop) {
    return null;
  }

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <Image
        aspectRatio={3 / 2}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
      />
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
    </TileLink>
  );
};

TileAL.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileAL);
