import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import Image from "@times-components/image";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import { withPuzzleTileTracking } from "../shared";
import stylesFactory from "./styles";

const TileAK = ({ id, image, onPress, title, url, breakpoint }) => {
  const crop = image.crop32;
  const styles = stylesFactory(breakpoint);
  const { puzzleContainer, header, headline, imageContainer } = styles;

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
      <Image
        aspectRatio={3 / 2}
        disablePlaceholder
        relativeWidth={crop.relativeWidth}
        relativeHeight={crop.relativeHeight}
        relativeHorizontalOffset={crop.relativeHorizontalOffset}
        relativeVerticalOffset={crop.relativeVerticalOffset}
        style={imageContainer}
        uri={crop.url}
      />
    </Link>
  );
};

TileAK.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.shape({
    crop32: PropTypes.shape({
      url: PropTypes.string
    })
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  breakpoint: PropTypes.string.isRequired
};

export default withPuzzleTileTracking(TileAK);
