import React from "react";
import Image from "@times-components/image/image";
import Button from "@times-components/link/link";

const ArticleLeadAssetVideo = ({
  brightcoveVideoId,
  brightcovePolicyKey,
  brightcoveAccountId,
  posterImage: {
    crop: { ratio: image_ratio, url: image_url }
  },
  onVideoPress
}) => {
  const [ratioWidth, ratioHeight] = image_ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;
  return (
    <Button
      onPress={e =>
        onVideoPress(e, {
          brightcoveAccountId,
          brightcovePolicyKey,
          brightcoveVideoId
        })
      }
    >
      <Image uri={image_url} aspectRatio={aspectRatio} />
    </Button>
  );
};

export default ArticleLeadAssetVideo;
