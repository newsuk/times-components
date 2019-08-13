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

const TileAQ = ({ onPress, tile }) => {
  const crop = getTileImage(tile, "crop169");

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <View style={styles.imageContainer}>
        <Image
          aspectRatio={16 / 9}
          uri={crop.url}
          fill
          relativeWidth={crop.relativeWidth}
          relativeHeight={crop.relativeHeight}
          relativeHorizontalOffset={crop.relativeHorizontalOffset}
          relativeVerticalOffset={crop.relativeVerticalOffset}
        />
      </View>
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
    </TileLink>
  );
};

TileAQ.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileAQ);
