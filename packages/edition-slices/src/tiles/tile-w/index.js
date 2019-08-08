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
import WithoutWhiteSpace from "../shared/without-white-space";

const TileW = ({ onPress, tile, breakpoint }) => {
  const styles = stylesFactory(breakpoint);
  const crop = getTileImage(tile, "crop32");

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tile}
      withStar={false}
    >
      <WithoutWhiteSpace
        styles={styles.summaryContainer}
        render={whiteSpaceHeight => (
          <TileSummary
            headlineStyle={styles.headline}
            summary={getTileSummary(tile, 800)}
            summaryStyle={styles.summary}
            tile={tile}
            withStar
            starStyle={styles.star}
            whiteSpaceHeight={whiteSpaceHeight}
          />
        )}
      />
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
    </TileLink>
  );
};

TileW.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string.isRequired
};

export default withTileTracking(TileW);
