import React from "react";
import { TcView, AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";
import LeadAssetImage from "./article-lead-asset-image";
import { defaultProps, propTypes } from "./article-lead-asset-prop-types";

const ArticleLeadAsset = ({
  aspectRatio,
  className,
  renderCaption,
  displayImage,
  isVideo,
  leadAsset,
  style,
  isWebPFormatActive
}) => {
  if (!leadAsset || !displayImage) {
    return null;
  }

  const captionContainer = isVideo ? leadAsset.posterImage : leadAsset;
  const caption = {
    credits: captionContainer.credits,
    text: captionContainer.caption
  };

  const leadAssetView = isVideo ? (
    <Video
      accountId={leadAsset.brightcoveAccountId}
      height="100%"
      id={leadAsset.id}
      is360={leadAsset.is360}
      playerId={leadAsset.brightcovePlayerId}
      policyKey={leadAsset.brightcovePolicyKey}
      position="absolute"
      poster={{ uri: displayImage.url }}
      videoId={leadAsset.brightcoveVideoId}
      width="100%"
    />
  ) : (
    <LeadAssetImage
      aspectRatio={aspectRatio}
      alt={leadAsset.title || caption.text}
      uri={displayImage.url}
      isWebPFormatActive={isWebPFormatActive}
    />
  );

  return (
    <TcView className={className} style={style}>
      <figure style={{ margin: 0 }}>
        <AspectRatioContainer aspectRatio={aspectRatio}>
          {leadAssetView}
        </AspectRatioContainer>
        {renderCaption && <figcaption>{renderCaption({ caption })}</figcaption>}
      </figure>
    </TcView>
  );
};

ArticleLeadAsset.propTypes = propTypes;
ArticleLeadAsset.defaultProps = defaultProps;

export default ArticleLeadAsset;
