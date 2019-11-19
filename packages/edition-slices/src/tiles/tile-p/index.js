import React from "react";
import PropTypes from "prop-types";
import Byline from "@times-components/article-byline";
import {
  getTileImage,
  getTileStrapline,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking
} from "../shared";
import styles from "./styles";

const TileP = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop11");

  if (!crop) {
    return null;
  }

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileImage
        aspectRatio={1}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
        rounded
        resizeMode="cover"
      />
      <Byline ast={tile.article.bylines} bylineStyle={styles.bylineOpinion} />
      <TileSummary
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        style={styles.summaryContainer}
        tile={tile}
        centeredStar
      />
    </TileLink>
  );
};

TileP.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileP);
