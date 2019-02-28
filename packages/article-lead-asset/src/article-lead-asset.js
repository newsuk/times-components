import React from "react";
import { View } from "react-native";
import { ModalImage } from "@times-components/image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";
import {
  nativePropTypes,
  nativeDefaultProps
} from "./article-lead-asset-prop-types";
import getRatio from "./get-ratio";

const ArticleLeadAssetModalImage = ({ aspectRatio, caption, uri }) => (
  <ModalImage {...{ aspectRatio, caption, uri }} />
);

const ArticleLeadAsset = ({
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
        caption={renderModalCaption({ caption })}
        leadAsset={leadAsset}
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
