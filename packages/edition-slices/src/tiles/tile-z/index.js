import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import {
  getTileImage,
  getTileSummary,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import styles from "./styles";
import WithoutWhiteSpace from "../shared/without-white-space";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileZ = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop32");

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <View style={styles.summaryContainer}>
        <WithoutWhiteSpace
          render={whiteSpaceHeight => (
            <TileSummary
              headlineStyle={styles.headline}
              summary={getTileSummary(tile, 800)}
              tile={tile}
              whiteSpaceHeight={whiteSpaceHeight}
              withStar={false}
            />
          )}
        />
        <PositionedTileStar articleId={tile.article.id} />
      </View>

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

TileZ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileZ);
