import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import BrightcoveVideo from "@times-components/brightcove-video";
import {
  LeadAsset,
  LeadAssetCaptionContainer
} from "./styles/article-body/responsive";

const AspectRatioContainer = ({ aspectRatio, children }) => {
  const [ratioWidth, ratioHeight] = aspectRatio.split(":");
  const aspectRatioPercent = ratioHeight / ratioWidth * 100;
  return (
    <View
      style={{ position: "relative", paddingBottom: `${aspectRatioPercent}%` }}
    >
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        {children}
      </View>
    </View>
  );
};

AspectRatioContainer.propTypes = {
  aspectRatio: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

const LeadAssetComponent = props => {
  const { leadAsset, isVideo, aspectRatio, displayImage } = props;
  if (!leadAsset) {
    return null;
  }
  let leadAssetView;
  if (isVideo) {
    leadAssetView = (
      <BrightcoveVideo
        width="100%"
        height="100%"
        position="absolute"
        policyKey={leadAsset.brightcovePolicyKey}
        videoId={leadAsset.brightcoveVideoId}
        accountId={leadAsset.brightcoveAccountId}
        poster={{ uri: displayImage.url }}
      />
    );
  } else {
    leadAssetView = <Image uri={displayImage.url} />;
  }

  return (
    <LeadAsset>
      <AspectRatioContainer aspectRatio={aspectRatio}>
        {leadAssetView}
      </AspectRatioContainer>
      <LeadAssetCaptionContainer>
        <Caption text={leadAsset.caption} credits={leadAsset.credits} />
      </LeadAssetCaptionContainer>
    </LeadAsset>
  );
};

const imageProps = PropTypes.shape({
  ratio: PropTypes.string,
  url: PropTypes.string
});

LeadAssetComponent.propTypes = {
  leadAsset: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string,
    crop: imageProps
  }),
  isVideo: PropTypes.bool,
  aspectRatio: PropTypes.string,
  displayImage: imageProps
};

LeadAssetComponent.defaultProps = {
  leadAsset: null,
  isVideo: false,
  aspectRatio: "1",
  displayImage: null
};

export default LeadAssetComponent;
