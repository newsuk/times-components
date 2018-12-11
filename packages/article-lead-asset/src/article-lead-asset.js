import React, { Fragment } from "react";
import { ModalImage } from "@times-components/image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";
import {
  nativePropTypes,
  nativeDefaultProps
} from "./article-lead-asset-prop-types";
import getRatio from "./get-ratio";

const ArticleLeadAssetModalImage = ({ aspectRatio, caption, uri, width }) => (
  <ModalImage {...{ aspectRatio, caption, uri, width }} />
);

const ArticleLeadAsset = ({
  getImageCrop,
  renderCaption,
  renderModalCaption = renderCaption,
  isVideo,
  leadAsset,
  onVideoPress,
  width
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

  const captionProps = {
    credits: imageContainer.credits,
    text: imageContainer.caption
  };

  return (
    <Fragment>
      <LeadAsset
        aspectRatio={getRatio(crop.ratio)}
        caption={renderModalCaption({ captionProps })}
        leadAsset={leadAsset}
        onVideoPress={onVideoPress}
        uri={crop.url}
        width={width}
      />
      {renderCaption({ captionProps })}
    </Fragment>
  );
};

ArticleLeadAsset.propTypes = nativePropTypes;
ArticleLeadAsset.defaultProps = nativeDefaultProps;

export default ArticleLeadAsset;
