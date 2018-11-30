import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleLeadAssetImage from "./article-lead-asset-image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";

const ArticleLeadAsset = ({ data, showCaptionOnNative, CaptionComponent, width, ...props }) => {
  const LeadAsset = data.isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetImage;

  return (
    <View {...props}>
      <LeadAsset {...data} width={width} />
      { showCaptionOnNative && <CaptionComponent credits={data.credits} text={data.caption} /> }
    </View>
  );
};

ArticleLeadAsset.propTypes = {
  CaptionComponent: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.shape(ArticleLeadAssetVideo.propTypes),
    PropTypes.shape(ArticleLeadAssetImage.propTypes)
  ]).isRequired,
  showCaptionOnNative: PropTypes.bool,
  width: PropTypes.number,
};

ArticleLeadAsset.defaultProps = {
  CaptionComponent: () => null,
  showCaptionOnNative: false,
  width: null,
};

export default ArticleLeadAsset;
