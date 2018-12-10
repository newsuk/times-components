import React, { Fragment } from "react";
import { ModalImage } from "@times-components/image";
import ArticleLeadAssetVideo from "./article-lead-asset-video";
import {
  nativePropTypes,
  nativeDefaultProps
} from "./article-lead-asset-prop-types";

const ArticleLeadAssetModalImage = ({ aspectRatio, caption, url, width }) => (
  <ModalImage {...{ aspectRatio, caption, url, width }} />
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

  const crop = getImageCrop(isVideo ? leadAsset.posterImage : leadAsset);
  if (!crop) {
    return null;
  }
  const { ratio, url } = crop;
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = Number(ratioWidth) / Number(ratioHeight);

  const LeadAsset = isVideo
    ? ArticleLeadAssetVideo
    : ArticleLeadAssetModalImage;

  const captionProps = {
    credits: leadAsset.credits,
    text: leadAsset.caption
  };

  return (
    <Fragment>
      <LeadAsset
        aspectRatio={aspectRatio}
        caption={renderModalCaption({ captionProps })}
        leadAsset={leadAsset}
        onVideoPress={onVideoPress}
        url={url}
        width={width}
      />
      {renderCaption({ captionProps })}
    </Fragment>
  );
};

ArticleLeadAsset.propTypes = nativePropTypes;
ArticleLeadAsset.defaultProps = nativeDefaultProps;

export default ArticleLeadAsset;
