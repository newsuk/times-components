import React from "react";
import Image from "@times-components/image";
import { AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";

import { defaultProps, propTypes } from "./article-lead-asset-prop-types";

const ArticleLeadAsset = ({
  aspectRatio,
  renderCaption,
  displayImage,
  isVideo,
  leadAsset,
  width
}) => {
  if (!leadAsset || !displayImage) {
    return null;
  }

  const captionContainer = isVideo ? leadAsset.posterImage : leadAsset;
  const captionProps = {
    credits: captionContainer.credits,
    text: captionContainer.caption
  };

  const leadAssetView = isVideo ? (
    <Video
      accountId={leadAsset.brightcoveAccountId}
      height="100%"
      paidOnly={leadAsset.paidOnly}
      policyKey={leadAsset.brightcovePolicyKey}
      position="absolute"
      poster={{ uri: displayImage.url }}
      skySports={leadAsset.skySports}
      videoId={leadAsset.brightcoveVideoId}
      width="100%"
    />
  ) : (
    <Image highResSize={width} lowResSize={100} uri={displayImage.url} />
  );

  return (
    <figure style={{ margin: 0 }}>
      <AspectRatioContainer aspectRatio={aspectRatio}>
        {leadAssetView}
      </AspectRatioContainer>
      {renderCaption && (
        <figcaption>{renderCaption({ captionProps })}</figcaption>
      )}
    </figure>
  );
};

ArticleLeadAsset.propTypes = propTypes;
ArticleLeadAsset.defaultProps = defaultProps;

export default ArticleLeadAsset;
