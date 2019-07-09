import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImage,
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";

const TileAH = ({ onPress, tile, breakpoint }) => {
  const crop = getTileImage(tile, "crop11");
  const styles = stylesFactory(breakpoint);

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tile}
      starStyle={styles.star}
    >
      <Image
        aspectRatio={1}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        rounded
        resizeMode="cover"
      />
      <TileSummary
        bylines={tile.article.bylines}
        bylineStyle={styles.bylineOpinion}
        headlineStyle={styles.headline}
        strapline={getTileStrapline(tile)}
        straplineStyle={styles.strapline}
        style={styles.summaryContainer}
        tile={tile}
      />
    </TileLink>
  );
};

TileAH.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string.isRequired
};

export default withTileTracking(TileAH);
