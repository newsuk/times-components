import React from "react";
import Image from "@times-components/image";
import { AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";
import { LeadAsset } from "./styles/responsive.web";

import { defaultProps, propTypes } from "./prop-types";

const ArticleLeadAsset = ({
  aspectRatio,
  renderCaption,
  displayImage,
  isVideo,
  leadAsset,
  width
}) => {
  if (!leadAsset) {
    return null;
  }

  const { url } = displayImage;
  const captionProps = {
    credits: leadAsset.credits,
    text: leadAsset.caption
  };

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
    <LeadAsset>
      <figure style={{ margin: 0 }}>
        <AspectRatioContainer aspectRatio={aspectRatio}>
          {leadAssetView}
        </AspectRatioContainer>
        {renderCaption && (
          <figcaption>{renderCaption({ captionProps })}</figcaption>
        )}
      </figure>
    </LeadAsset>
  );
};

ArticleLeadAsset.propTypes = propTypes;
ArticleLeadAsset.defaultProps = defaultProps;

export default ArticleLeadAsset;
