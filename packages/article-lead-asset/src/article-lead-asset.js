import React from "react";
import { View } from "react-native";
import ArticleLeadAssetImage from "./article-lead-asset-image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";

import { nativePropTypes, nativeDefaultProps } from "./prop-types";

const ArticleLeadAsset = ({
  getImageCrop,
  renderCaption,
  renderModalCaption = renderCaption,
  isVideo,
  leadAsset,
  onVideoPress,
  width
}) => {
  const LeadAsset = isVideo ? ArticleLeadAssetVideo : ArticleLeadAssetImage;
  const captionProps = {
    credits: leadAsset.credits,
    text: leadAsset.caption
  };

  return (
    <View>
      <LeadAsset
        caption={renderModalCaption({ captionProps })}
        getImageCrop={getImageCrop}
        leadAsset={leadAsset}
        onVideoPress={onVideoPress}
        width={width}
      />
      {renderCaption({ captionProps })}
    </View>
  );
};

ArticleLeadAsset.propTypes = nativePropTypes;
ArticleLeadAsset.defaultProps = nativeDefaultProps;

export default ArticleLeadAsset;
