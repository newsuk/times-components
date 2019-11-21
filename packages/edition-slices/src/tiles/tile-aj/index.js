import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import { withPuzzleTileTracking, TileImage } from "../shared";
import styles from "./styles";

const { puzzleContainer, header, headline, imageContainer } = styles;

const TileAJ = ({ id, image, onPress, title, url }) => {
  const crop = image.crop32;

  if (!crop) {
    return null;
  }

  return (
    <Link
      key={id}
      linkStyle={puzzleContainer}
      onPress={() => onPress({ id, title, url })}
      url={url}
      withStar={false}
    >
      <View style={header}>
        <ArticleSummaryHeadline headline={title} style={headline} />
      </View>
      <TileImage
        aspectRatio={3 / 2}
        disablePlaceholder
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={imageContainer}
        uri={crop.url}
        fill
      />
    </Link>
  );
};

TileAJ.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.shape({
    crop32: PropTypes.shape({
      url: PropTypes.string
    })
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default withPuzzleTileTracking(TileAJ);
