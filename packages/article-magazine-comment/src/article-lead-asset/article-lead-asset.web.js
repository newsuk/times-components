import React from "react";
import PropTypes from "prop-types";
import Caption from "@times-components/caption";
import Image from "@times-components/image";
import { AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";
import cropPropTypes from "./crop-prop-types";
import { LeadAsset, LeadAssetCaptionContainer } from "../styles/responsive";
import styles from "../styles";
import { leadAssetPropTypes } from "./article-lead-asset-prop-types";

const LeadAssetComponent = ({
  aspectRatio,
  displayImage,
  isVideo,
  leadAsset,
  width
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
    <LeadAsset style={styles.leadAssetContainer}>
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
  aspectRatio: PropTypes.string,
  displayImage: cropPropTypes,
  isVideo: PropTypes.bool,
  leadAsset: PropTypes.shape(leadAssetPropTypes),
  width: PropTypes.number
};

LeadAssetComponent.defaultProps = {
  aspectRatio: "1",
  displayImage: null,
  isVideo: false,
  leadAsset: null,
  width: null
};

export default LeadAssetComponent;
