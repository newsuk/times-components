import React from "react";
import PropTypes from "prop-types";
import ArticleLeadAssetImage from "./article-lead-asset-image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";

const ArticleLeadAsset = ({ data, width }) => {
  const LeadAsset = data.isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetImage;

  return <LeadAsset {...data} width={width} />;
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
