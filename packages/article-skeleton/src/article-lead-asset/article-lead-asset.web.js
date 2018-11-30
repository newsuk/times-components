import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";
import cropPropTypes from "./crop-prop-types";
import { LeadAsset, LeadAssetCaptionContainer } from "../styles/responsive.web";
import { leadAssetPropTypes } from "./article-lead-asset-prop-types";

const LeadAssetComponent = ({
  aspectRatio,
  CaptionComponent,
  displayImage,
  isVideo,
  leadAsset,
  showCaptionOnNative,
  width,
  ...props
}) => {
  if (!leadAsset) {
    return null;
  }

  const { url } = displayImage;
  const leadAssetView = isVideo ? (
    <Video
      accountId={leadAsset.brightcoveAccountId}
      height="100%"
      paidOnly={leadAsset.paidOnly}
      policyKey={leadAsset.brightcovePolicyKey}
      position="absolute"
      poster={{ uri: url }}
      skySports={leadAsset.skySports}
      videoId={leadAsset.brightcoveVideoId}
      width="100%"
    />
  ) : (
    <Image highResSize={width} lowResSize={100} uri={url} />
  );

  return (
    <LeadAsset {...props}>
      <figure style={{ margin: 0 }}>
        <AspectRatioContainer aspectRatio={aspectRatio}>
          {leadAssetView}
        </AspectRatioContainer>
        <LeadAssetCaptionContainer showCaptionOnNative={showCaptionOnNative}>
          <figcaption>
            <CaptionComponent
              credits={leadAsset.credits}
              text={leadAsset.caption}
            />
          </figcaption>
        </LeadAssetCaptionContainer>
      </figure>
    </LeadAsset>
  );
};

LeadAsset.Container = LeadAsset;
LeadAsset.CaptionContainer = LeadAssetCaptionContainer;

LeadAssetComponent.propTypes = {
  aspectRatio: PropTypes.string,
  CaptionComponent: PropTypes.func.isRequired,
  displayImage: cropPropTypes,
  isVideo: PropTypes.bool,
  leadAsset: PropTypes.shape(leadAssetPropTypes),
  showCaptionOnNative: PropTypes.bool,
  width: PropTypes.number
};

LeadAssetComponent.defaultProps = {
  aspectRatio: "1",
  displayImage: null,
  isVideo: false,
  leadAsset: null,
  showCaptionOnNative: false,
  width: null
};

export default LeadAssetComponent;
