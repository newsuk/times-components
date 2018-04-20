import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import Video from "@times-components/video";
import cropPropTypes from "./crop-proptypes";
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
      width="100%"
      height="100%"
      position="absolute"
      policyKey={leadAsset.brightcovePolicyKey}
      videoId={leadAsset.brightcoveVideoId}
      accountId={leadAsset.brightcoveAccountId}
      paidOnly={leadAsset.paidOnly}
      poster={{ uri: displayImage.url }}
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
        <Caption text={leadAsset.caption} credits={leadAsset.credits} />
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
