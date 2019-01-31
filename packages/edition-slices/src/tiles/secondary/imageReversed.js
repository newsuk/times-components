import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ArticleFlags } from "@times-components/article-flag";
import ArticleSummary, {
  ArticleSummaryHeadline
} from "@times-components/article-summary";
import Image from "@times-components/image";
import { colours } from "@times-components/styleguide";
import styles from "./styles";

const renderImage = imageUri => (
  <View style={styles.imageContainer}>
    <Image aspectRatio={16 / 9} uri={imageUri} />
  </View>
);

const SecondaryTileImageReversed = ({
  tile: {
    article: {
      flags,
      hasVideo = false,
      headline,
      label,
      leadAsset,
      section,
      shortHeadline
    }
  },
  withImage
}) => (
  <View>
    {withImage ? renderImage(leadAsset.crop169.url) : null}
    <ArticleSummary
      flags={() => <ArticleFlags flags={flags} />}
      headline={() => (
        <ArticleSummaryHeadline headline={headline || shortHeadline} />
      )}
      label={label}
      labelProps={{
        color: colours.section[section] || colours.section.default,
        isVideo: hasVideo,
        title: label
      }}
    />
  </View>
);

SecondaryTileImageReversed.propTypes = {
  tile: PropTypes.shape({}).isRequired,
  withImage: PropTypes.bool
};

SecondaryTileImageReversed.defaultProps = {
  withImage: false
};

export default SecondaryTileImageReversed;
