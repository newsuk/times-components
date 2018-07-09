import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import Video from "@times-components/video";
import cropPropTypes from "./crop-prop-types";
import {
  LeadAsset,
  LeadAssetCaptionContainer
} from "../styles/article-body/responsive";

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

const LeadAssetComponent = ({
  aspectRatio,
  displayImage,
  isVideo,
  leadAsset
}) => {
  if (!leadAsset) {
    return null;
  }
  const leadAssetView = isVideo ? (
    <Video
      accountId={leadAsset.brightcoveAccountId}
      height="100%"
      paidOnly={leadAsset.paidOnly}
      policyKey={leadAsset.brightcovePolicyKey}
      position="absolute"
      poster={{ uri: displayImage.url }}
      videoId={leadAsset.brightcoveVideoId}
      width="100%"
    />
  ) : (
    <Image uri={displayImage.url} />
  );

  return (
    <LeadAsset>
      <AspectRatioContainer aspectRatio={aspectRatio}>
        {leadAssetView}
      </AspectRatioContainer>
      <LeadAssetCaptionContainer>
        <Caption credits={leadAsset.credits} text={leadAsset.caption} />
      </LeadAssetCaptionContainer>
    </LeadAsset>
  );
};

LeadAssetComponent.propTypes = {
  leadAsset: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string,
    crop: cropPropTypes
  }),
  isVideo: PropTypes.bool,
  aspectRatio: PropTypes.string,
  displayImage: cropPropTypes
};

LeadAssetComponent.defaultProps = {
  leadAsset: null,
  isVideo: false,
  aspectRatio: "1",
  displayImage: null
};

export default LeadAssetComponent;
