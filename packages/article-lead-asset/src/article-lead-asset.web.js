import React from "react";
import { View } from "react-native";
import { AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";
import LeadAssetImage from "./article-lead-asset-image.web";
import { defaultProps, propTypes } from "./article-lead-asset-prop-types";

const ArticleLeadAsset = ({
  aspectRatio,
  className,
  renderCaption,
  displayImage,
  isVideo,
  leadAsset,
  style
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
      paidOnly={leadAsset.paidOnly}
      playerId={leadAsset.brightcovePlayerId}
      policyKey={leadAsset.brightcovePolicyKey}
      position="absolute"
      poster={{ uri: displayImage.url }}
      skySports={leadAsset.skySports}
      videoId={leadAsset.brightcoveVideoId}
      width="100%"
    />
  ) : (
    <LeadAssetImage
      aspectRatio={aspectRatio}
      alt={caption.text}
      uri={displayImage.url}
    />
  );

  return (
    <View className={className} style={style}>
      <figure style={{ margin: 0 }}>
        <AspectRatioContainer aspectRatio={aspectRatio}>
          {leadAssetView}
        </AspectRatioContainer>
        {renderCaption && <figcaption>{renderCaption({ caption })}</figcaption>}
      </figure>
    </View>
  );
};

ArticleLeadAsset.propTypes = propTypes;
ArticleLeadAsset.defaultProps = defaultProps;

export default ArticleLeadAsset;
