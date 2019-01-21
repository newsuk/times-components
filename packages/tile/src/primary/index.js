import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleSummary, { ArticleSummaryHeadline } from "@times-components/article-summary";
import Image from "@times-components/image";
import { colours, spacing } from "@times-components/styleguide";
import { normaliseWidth, screenWidthInPixels } from "@times-components/utils";

const renderImage = imageUri => {
  console.log("RenderImage:", imageUri);
  return (
    <View
      style={{
        backgroundColor: "blue",
        flex: 1,
        marginBottom: spacing(2),
        minWidth: "100%"
      }}>
      <Image
        highResSize={normaliseWidth(screenWidthInPixels())}
        imageRatio={16 / 9}
        uri={imageUri}
      />
    </View >
  );
};

const PrimaryTile = ({ tile: { article: { hasVideo, headline, label, leadAsset, section, shortHeadline } }, withImage }) => (
  <View style={{ backgroundColor: "red", height: 600 }}>
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
      }}
      style={{ marginHorizontal: 10 }} />
    {withImage ? renderImage(leadAsset.crop169.url) : null}
  </View>
);

PrimaryTile.propTypes = {
  withImage: PropTypes.bool
}

PrimaryTile.defaultProps = {
  withImage: true
}

export default PrimaryTile;
