import React from "react";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import Image from "@times-components/image";
import {
  getTileImage,
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileN = ({ isDarkStar, onPress, tile, breakpoint }) => {
  const styles = styleFactory(breakpoint);
  const crop = getTileImage(tile, "crop11");

  return (
    <TileLink
      onPress={onPress}
      style={styles.container}
      tile={tile}
      isDarkStar={isDarkStar}
    >
      <Image
        aspectRatio={1}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
        fill
      />
      <TileSummary
        flagColour={styles.flagColour}
        headlineStyle={styles.headline}
        labelColour={colours.functional.greyLabel}
        strapline={getTileStrapline(tile)}
        style={styles.summaryContainer}
        tile={tile}
      />
    </TileLink>
  );
};

TileN.propTypes = {
  isDarkStar: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  breakpoint: PropTypes.string.isRequired,
  tile: PropTypes.shape({}).isRequired
};

TileN.defaultProps = {
  isDarkStar: true
};

export default withTileTracking(TileN);
