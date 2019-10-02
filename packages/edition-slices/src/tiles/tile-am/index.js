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
import styles from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileAM = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop169");

  if (!crop) {
    return null;
  }

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
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

TileAM.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAM);
