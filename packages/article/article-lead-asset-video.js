import React from "react";
import Image from "@times-components/image/image";
import Link from "@times-components/link/link";

const ArticleLeadAssetVideo = ({
  brightcoveVideoId,
  brightcovePolicyKey,
  brightcoveAccountId,
  paidonly,
  caption,
  posterImage: {
    id: image_id,
    title: image_title,
    credits: image_credits,
    caption: image_caption,
    crop: { ratio: image_ratio, url: image_url }
  },
  onVideoPress
}) => {
  const [ratioWidth, ratioHeight] = image_ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;
  return (
    <Link
      onPress={e =>
        onVideoPress(e, {
          brightcoveAccountId,
          brightcovePolicyKey,
          brightcoveVideoId
        })
      }
    >
      <Image uri={image_url} aspectRatio={aspectRatio} />
    </Link>
  );
};

export default ArticleLeadAssetVideo;
