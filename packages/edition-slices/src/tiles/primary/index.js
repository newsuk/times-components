import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ArticleFlags } from "@times-components/article-flag";
import ArticleSummary, {
  ArticleSummaryContent,
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

const renderSummaryContent = (summary, withMargins) => (
  <ArticleSummaryContent
    ast={summary}
    style={withMargins && styles.summaryContainer}
  />
);

const PrimaryTile = ({
  tile: {
    article: {
      flags,
      hasVideo,
      headline,
      label,
      leadAsset,
      section,
      shortHeadline,
      summary125
    }
  },
  withImage,
  withSummaryMargins
}) => (
  <View>
    <ArticleSummary
      flags={() => <ArticleFlags flags={flags} />}
      headline={() => (
        <ArticleSummaryHeadline
          headline={headline || shortHeadline}
          style={styles.headline}
        />
      )}
      label={label}
      labelProps={{
        color: colours.section[section] || colours.section.default,
        isVideo: hasVideo,
        title: label
      }}
      style={withSummaryMargins && styles.summaryContainer}
    />
    {withImage
      ? renderImage(leadAsset.crop169.url)
      : renderSummaryContent(summary125, withSummaryMargins)}
  </View>
);

PrimaryTile.propTypes = {
  tile: PropTypes.shape({}).isRequired,
  withImage: PropTypes.bool,
  withSummaryMargins: PropTypes.bool
};

PrimaryTile.defaultProps = {
  withImage: false,
  withSummaryMargins: false
};

export default PrimaryTile;
