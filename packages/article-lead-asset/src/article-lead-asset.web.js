import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { AspectRatioContainer } from "@times-components/utils";
import Video from "@times-components/video";

import { defaultProps, propTypes } from "./article-lead-asset-prop-types";

const ArticleLeadAsset = ({
  className,
  aspectRatio,
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
    <View className={className} style={style}>
      <figure style={{ margin: 0 }}>
        <AspectRatioContainer aspectRatio={aspectRatio}>
          {leadAssetView}
        </AspectRatioContainer>
        {renderCaption && (
          <figcaption>{renderCaption({ captionProps })}</figcaption>
        )}
      </figure>
    </View>
  );
};

ArticleLeadAsset.propTypes = propTypes;
ArticleLeadAsset.defaultProps = defaultProps;

export default ArticleLeadAsset;
