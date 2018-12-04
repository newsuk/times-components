import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";
import cropPropTypes from "./crop-prop-types";
import { LeadAsset } from "./styles/responsive.web";
import { propTypes, defaultProps } from "./article-lead-asset-prop-types";

const LeadAssetComponent = ({
  aspectRatio,
  caption,
  displayImage,
  isVideo,
  leadAsset,
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
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </LeadAsset>
  );
};

LeadAssetComponent.propTypes = {
  ...propTypes,
  aspectRatio: PropTypes.string,
  displayImage: cropPropTypes,
  isVideo: PropTypes.bool,
  leadAsset: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string,
    crop: cropPropTypes,
    crop11: cropPropTypes,
    crop23: cropPropTypes,
    crop32: cropPropTypes,
    crop45: cropPropTypes,
    crop169: cropPropTypes,
    crop1251: cropPropTypes
  }),
};

LeadAssetComponent.defaultProps = {
  ...defaultProps,
  aspectRatio: "1",
  displayImage: null,
  isVideo: false,
  leadAsset: null,
};

export default LeadAssetComponent;
