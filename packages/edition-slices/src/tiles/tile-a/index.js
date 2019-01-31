import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileSummary } from "../shared";
import styles from "./styles";

const TileA = ({
  tile: {
    article: {
      flags,
      hasVideo,
      headline,
      label,
      leadAsset: {
        crop169: { url: imageUrl }
      },
      section,
      shortHeadline,
      summary125
    }
  }
}) => (
  <View>
    <TileSummary
      flags={flags}
      hasVideo={hasVideo}
      headline={headline || shortHeadline}
      headlineStyle={styles.headline}
      label={label}
      section={section}
      style={styles.summaryContainer}
      summary={summary125}
    />
    <TileImage
      aspectRatio={16 / 9}
      style={styles.imageContainer}
      uri={imageUrl}
    />
  </View>
);

TileA.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileA;
