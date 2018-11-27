import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Caption from "@times-components/caption";
import ArticleLeadAssetImage from "./article-lead-asset-image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";
import styles from "../styles";

const ArticleLeadAsset = ({ data, width }) => {
  const LeadAsset = data.isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetImage;

  return (
    <View style={styles.leadAssetContainer}>
      <LeadAsset {...data} width={width} />
      <Caption credits={data.credits} text={data.caption} />
    </View>
  );
};

ArticleLeadAsset.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape(ArticleLeadAssetVideo.propTypes),
    PropTypes.shape(ArticleLeadAssetImage.propTypes)
  ]).isRequired,
  width: PropTypes.number
};

ArticleLeadAsset.defaultProps = {
  width: null
};

export default ArticleLeadAsset;
