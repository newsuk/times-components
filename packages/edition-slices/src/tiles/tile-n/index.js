import React from "react";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import Image from "@times-components/image";
import {
  getTileImageUri,
  getTileStrapline,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styleFactory from "./styles";

const TileN = ({ isDarkStar, onPress, tile, breakpoint }) => {
  const styles = styleFactory(breakpoint);
  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <Image
        aspectRatio={1}
        style={styles.imageContainer}
        uri={getTileImageUri(tile, "crop11")}
      />
      <TileSummary
        flagColour={styles.flagColour}
        headlineStyle={styles.headline}
        isDarkStar={isDarkStar}
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
