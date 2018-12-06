import React from "react";
import { View } from "react-native";
import { ModalImage } from "@times-components/image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";
import {
  nativePropTypes,
  nativeDefaultProps
} from "./article-lead-asset-prop-types";

const ArticleLeadAsset = ({
  className,
  getImageCrop,
  renderCaption,
  renderModalCaption = renderCaption,
  isVideo,
  leadAsset,
  onVideoPress,
  width,
  style
}) => {
  if (!leadAsset) {
    return null;
  }

  const crop = getImageCrop(isVideo ? leadAsset.posterImage : leadAsset);
  if (!crop) {
    return null;
  }
  const { ratio, url } = crop;
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = Number(ratioWidth) / Number(ratioHeight);

  const LeadAsset = isVideo ? ArticleLeadAssetVideo : ModalImage;
  const captionProps = {
    credits: leadAsset.credits,
    text: leadAsset.caption
  };

  return (
    <View className={className} style={style}>
      <LeadAsset
        aspectRatio={aspectRatio}
        caption={renderModalCaption({ captionProps })}
        leadAsset={leadAsset}
        onVideoPress={onVideoPress}
        url={url}
        width={width}
      />
      {renderCaption({ captionProps })}
    </View>
  );
};

ArticleLeadAsset.propTypes = nativePropTypes;
ArticleLeadAsset.defaultProps = nativeDefaultProps;

export default ArticleLeadAsset;
