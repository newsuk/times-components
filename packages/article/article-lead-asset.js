import React from "react";
import PropTypes from "prop-types";
import ArticleLeadAssetVideo, {
  propTypes as videoPropTypes
} from "./article-lead-asset-video";
import ArticleLeadAssetImage, {
  propTypes as imagePropTypes
} from "./article-lead-asset-image";

const ArticleLeadAsset = ({ data }) => {
  const LeadAsset = data.isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetImage;

  return <LeadAsset {...data} />;
};

ArticleLeadAsset.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape(videoPropTypes),
    PropTypes.shape(imagePropTypes)
  ]).isRequired
};

export default ArticleLeadAsset;
