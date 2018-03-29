import React from "react";
import ArticleLeadAssetVideo from "./article-lead-asset-video";
import ArticleLeadAssetImage from "./article-lead-asset-image";

const ArticleLeadAsset = ({ data, onVideoPress }) => {
  const LeadAsset = data.isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetImage;

  return <LeadAsset {...data} onVideoPress={onVideoPress} />;
};

export default ArticleLeadAsset;
