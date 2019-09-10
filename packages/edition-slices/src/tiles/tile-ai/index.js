import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { editionBreakpoints } from "@times-components/styleguide";
import { getTileImage, TileLink, withTileTracking } from "../shared";
import styleFactory from "./styles";

const TileAI = ({ onPress, tile, breakpoint }) => {
  const crop = getTileImage(tile, "crop32");
  const styles = styleFactory(breakpoint);

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
    </TileLink>
  );
};

TileAI.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

TileAI.defaultProps = {
  breakpoint: editionBreakpoints.medium
};

export default withTileTracking(TileAI);
