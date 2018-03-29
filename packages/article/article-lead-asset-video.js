import React from "react";
import Image from "@times-components/image/image";

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
    <Image uri={image_url} aspectRatio={aspectRatio} />
  )
};

export default ArticleLeadAssetVideo;
