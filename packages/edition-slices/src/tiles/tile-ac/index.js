import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";
import Image from "@times-components/image";
import {
  getTileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileAC = ({ onPress, tile, breakpoint }) => {
  const styles = styleFactory(breakpoint);
  const crop = getTileImage(tile, "crop169");

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
      <TileSummary
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        tile={tile}
        centeredStar
        underneathTextStar
      />
    </TileLink>
  );
};

TileAC.propTypes = {
  breakpoint: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

TileAC.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default withTileTracking(TileAC);
