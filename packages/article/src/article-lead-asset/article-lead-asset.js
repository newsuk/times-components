import React from "react";
import PropTypes from "prop-types";
import ArticleLeadAssetImage, {
  propTypes as imagePropTypes
} from "./article-lead-asset-image";
import ArticleLeadAssetVideo, {
  propTypes as videoPropTypes
} from "./article-lead-asset-video";

const ArticleLeadAsset = ({ data, width }) => {
  const LeadAsset = data.isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetImage;

  return <LeadAsset {...data} width={width} />;
};

ArticleLeadAsset.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape(videoPropTypes),
    PropTypes.shape(imagePropTypes)
  ]).isRequired,
  width: PropTypes.number
};

ArticleLeadAsset.defaultProps = {
  width: null
};

export default ArticleLeadAsset;
