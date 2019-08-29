/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { editionBreakpoints } from "@times-components/styleguide";
import {
  getTileImage,
  TileLink,
  TileSummary,
  withTileTracking
} from "../shared";
import stylesFactory from "./styles";
import PositionedTileStar from "../shared/positioned-tile-star";

const TileG = ({ onPress, tile, breakpoint = editionBreakpoints.small }) => {
  const crop = getTileImage(tile, "crop11");
  const styles = stylesFactory(breakpoint);

  const [summaryContainer, setSummaryContainer] = useState({
    height: 0,
    isRendered: false
  });
  const [summaryContent, setSummaryContent] = useState({
    height: 0,
    isRendered: false
  });
  let withCustomPosition = true;

  if (summaryContent.isRendered && summaryContainer.isRendered) {
    withCustomPosition = !(
      summaryContent.height + styles.customStar.height >
      summaryContainer.height
    );
  }

  return (
    <TileLink onPress={onPress} style={styles.container} tile={tile}>
      <View style={styles.outerWrapper}>
        <View style={styles.innerWrapper}>
          <Image
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
          <View
            style={styles.summaryContainer}
            onLayout={e =>
              !summaryContainer.isRendered &&
              setSummaryContainer({
                height: e.nativeEvent.layout.height,
                isRendered: true
              })
            }
          >
            <View
              style={styles.summaryContent}
              onLayout={e =>
                !summaryContent.isRendered &&
                setSummaryContent({
                  height: e.nativeEvent.layout.height,
                  isRendered: true
                })
              }
            >
              <TileSummary
                headlineStyle={styles.headline}
                tile={tile}
                withStar={false}
              />
            </View>
          </View>
        </View>
        <PositionedTileStar
          articleId={tile.article.id}
          customPosition={{
            ...styles.nopadding,
            ...(withCustomPosition ? styles.customPosition : {})
          }}
          starStyle={styles.customStar}
        />
      </View>
    </TileLink>
  );
};

TileG.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string
};

export default withTileTracking(TileG);
