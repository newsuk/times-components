/* eslint-disable react/require-default-props */
import React from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import {
  getTileImage,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";

const TileG = ({ onPress, tile, breakpoint = editionBreakpoints.small }) => {
  const crop = getTileImage(tile, "crop11");
  const styles = stylesFactory(breakpoint);

  if (!crop) {
    return null;
  }

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TcView style={styles.outerContainer}>
        <TcView style={styles.innerContainer}>
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
          <TileSummary
            headlineStyle={styles.headline}
            style={styles.summaryContainer}
            tile={tile}
            withStar={false}
          />
        </TcView>
      </TcView>
    </TileLink>
  );
};

TileG.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileG);
