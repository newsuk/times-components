import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleSummary, { ArticleSummaryContent, ArticleSummaryHeadline } from "@times-components/article-summary";
import Image from "@times-components/image";
import { colours, spacing } from "@times-components/styleguide";

const renderImage = imageUri => (
  <View
    style={{
      backgroundColor: "blue",
      marginBottom: spacing(2),
      width: "100%"
    }}>
    <Image aspectRatio={16 / 9} uri={imageUri} />
  </View >
);

const renderSummaryContent = summary => (<ArticleSummaryContent ast={summary} />);

const PrimaryTile = ({ tile: { article: { hasVideo, headline, label, leadAsset, section, shortHeadline, summary125 } }, withImage }) => (
  <View>
    <ArticleSummary
      headline={() => (
        <ArticleSummaryHeadline headline={headline || shortHeadline} />
      )}
      label={label}
      labelProps={{
        color:
          colours.section[section] || colours.section.default,
        isVideo: hasVideo,
        title: label
      }} />
    {withImage ? renderImage(leadAsset.crop169.url) : renderSummaryContent(summary125)}
  </View>
);

PrimaryTile.propTypes = {
  withImage: PropTypes.bool
}

PrimaryTile.defaultProps = {
  withImage: true
}

export default PrimaryTile;
