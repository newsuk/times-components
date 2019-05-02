import React from "react";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";
import Image from "@times-components/image";
import {
  getTileImageUri,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileAC = ({ onPress, tile, breakpoint }) => {
  const styles = styleFactory(breakpoint);
  const { container, headline, imageContainer, summaryContainer } = styles;

  return (
    <TileLink onPress={onPress} style={container} tile={tile}>
      <Image
        aspectRatio={16 / 9}
        style={imageContainer}
        uri={getTileImageUri(tile, "crop169")}
      />
      <TileSummary
        headlineStyle={headline}
        starStyle={styles.star}
        style={summaryContainer}
        tile={tile}
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
