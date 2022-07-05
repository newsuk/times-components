import React from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import {
  getTileImage,
  getTileSummary,
  TileLink,
  TileSummary,
  TileImage,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";

const TileAS = ({ onPress, tile, breakpoint }) => {
  const crop = getTileImage(tile, "crop32");
  const styles = stylesFactory(breakpoint);

  if (!crop) {
    return null;
  }

  const {
    article: { hasVideo }
  } = tile;

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <TcView style={styles.imageContainer}>
        <TileImage
          aspectRatio={3 / 2}
          uri={crop.url}
          fill
          relativeWidth={crop.relativeWidth}
          relativeHeight={crop.relativeHeight}
          relativeHorizontalOffset={crop.relativeHorizontalOffset}
          relativeVerticalOffset={crop.relativeVerticalOffset}
          hasVideo={hasVideo}
        />
      </TcView>
      <TileSummary
        headlineStyle={styles.headline}
        summary={getTileSummary(tile, 125)}
        summaryStyle={styles.summary}
        style={styles.summaryContainer}
        tile={tile}
      />
    </TileLink>
  );
};

TileAS.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string.isRequired
};

export default withTileTracking(TileAS);
