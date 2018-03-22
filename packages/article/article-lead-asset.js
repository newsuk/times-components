import React from "react";
import { Text } from "react-native";
import ArticleLeadAssetVideo from "./article-lead-asset-video";
import styles from "./styles/article-body";
import ArticleLeadAssetImage from "./article-lead-asset-image";

const ArticleLeadAsset = ({ data }) => {
  const LeadAsset = data.isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetImage;

  return <LeadAsset {...data} />;
};

export default ArticleLeadAsset;
