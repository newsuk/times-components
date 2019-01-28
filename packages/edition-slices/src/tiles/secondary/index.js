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

const SecondaryTile = ({
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
  }
}) => (
  <View>
    <ArticleSummary
      content={() => <ArticleSummaryContent ast={summary125} />}
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
    {renderImage(leadAsset.crop169.url)}
  </View>
);

SecondaryTile.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default SecondaryTile;
