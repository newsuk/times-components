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
import styleFactory from "./styles";

const TileAB = ({ onPress, tile, breakpoint = editionBreakpoints.small }) => {
  const styles = styleFactory(breakpoint);
  const crop = getTileImage(tile, "crop23");

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TileSummary
        bylines={tile.article.bylines}
        headlineStyle={styles.headline}
        style={styles.summaryContainer}
        summary={getTileSummary(tile, 125)}
        tile={tile}
      />
      <Image
        aspectRatio={2 / 3}
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={styles.imageContainer}
        uri={crop.url}
      />
    </TileLink>
  );
};

TileAB.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAB);
