import React from "react";
import { View } from "react-native";
import Caption from "@times-components/caption";
import { ModalImage } from "@times-components/image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";
import {
  nativePropTypes,
  nativeDefaultProps
} from "./article-lead-asset-prop-types";
import getRatio from "./get-ratio";

const ArticleLeadAssetModalImage = ({
  aspectRatio,
  caption,
  onImagePress,
  uri
}) => <ModalImage {...{ aspectRatio, caption, onImagePress, uri }} index={0} />;

const ArticleLeadAsset = ({
  getImageCrop,
  renderCaption,
  isVideo,
  leadAsset,
  onImagePress,
  onVideoPress,
  width,
  style
}) => {
  if (!leadAsset) {
    return null;
  }

  const imageContainer = isVideo ? leadAsset.posterImage : leadAsset;
  const crop = getImageCrop(imageContainer);

  if (!crop) {
    return null;
  }
  const LeadAsset = isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetModalImage;

  const caption = {
    credits: imageContainer.credits,
    text: imageContainer.caption
  };

  return (
    <View style={style}>
      <LeadAsset
        aspectRatio={getRatio(crop.ratio)}
        caption={<Caption {...caption} />}
        leadAsset={leadAsset}
        onImagePress={onImagePress}
        onVideoPress={onVideoPress}
        uri={crop.url}
        width={width}
      />
      {renderCaption({ caption })}
    </View>
  );
};

ArticleLeadAsset.propTypes = nativePropTypes;
ArticleLeadAsset.defaultProps = nativeDefaultProps;

export default ArticleLeadAsset;
