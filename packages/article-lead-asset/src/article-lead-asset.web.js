import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";

import { defaultProps, propTypes } from "./article-lead-asset-prop-types";
import getRatio from "./get-ratio";

const ArticleLeadAsset = ({
  aspectRatio,
  className,
  renderCaption,
  displayImage,
  isVideo,
  leadAsset,
  style,
  width
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
      paidOnly={leadAsset.paidOnly}
      policyKey={leadAsset.brightcovePolicyKey}
      position="absolute"
      poster={{ uri: displayImage.url }}
      skySports={leadAsset.skySports}
      videoId={leadAsset.brightcoveVideoId}
      width="100%"
    />
  ) : (
    <Image
      aspectRatio={getRatio(aspectRatio)}
      highResSize={width}
      lowResSize={100}
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
