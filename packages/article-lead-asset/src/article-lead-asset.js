import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { propTypes, defaultProps } from "./article-lead-asset-prop-types";
import ArticleLeadAssetImage from "./article-lead-asset-image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";

const ArticleLeadAsset = ({ caption, data, modalCaption = caption, width, ...props }) => {
  const LeadAsset = data.isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetImage;

  return <View {...props}>
    <LeadAsset {...data} modalCaption={modalCaption} width={width} />
    {caption}
  </View>;
};

ArticleLeadAsset.propTypes = {
  ...propTypes,
  data: PropTypes.oneOfType([
    PropTypes.shape(ArticleLeadAssetVideo.propTypes),
    PropTypes.shape(ArticleLeadAssetImage.propTypes)
  ]).isRequired,
};

ArticleLeadAsset.defaultProps = defaultProps;

export default ArticleLeadAsset;
