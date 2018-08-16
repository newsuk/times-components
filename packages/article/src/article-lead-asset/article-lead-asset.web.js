import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import Video from "@times-components/video";
import cropPropTypes from "./crop-prop-types";
import {
  LeadAsset,
  LeadAssetCaptionContainer
} from "../styles/article-body/responsive";
import AspectRatioContainer from "../media-aspect-ratio";

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
      <figure style={{ margin: 0 }}>
        <AspectRatioContainer aspectRatio={aspectRatio}>
          {leadAssetView}
        </AspectRatioContainer>
        <LeadAssetCaptionContainer>
          <figcaption>
            <Caption credits={leadAsset.credits} text={leadAsset.caption} />
          </figcaption>
        </LeadAssetCaptionContainer>
      </figure>
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
