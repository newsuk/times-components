import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import Image from "@times-components/image";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import { withPuzzleTileTracking } from "../shared";
import styles from "./styles";

const { puzzleContainer, header, headline, imageContainer } = styles;

const TileAJ = ({ id, image, onPress, title, url }) => (
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
      style={imageContainer}
      uri={image.crop32.url}
    />
  </Link>
);

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
