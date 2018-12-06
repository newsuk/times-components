import React from "react";
import { ModalImage } from "@times-components/image";
import { imagePropTypes, imageDefaultProps } from "./prop-types";

const ArticleLeadAssetImage = ({ caption, getImageCrop, leadAsset, width }) => {
  const crop = getImageCrop(leadAsset);
  if (!crop) {
    return null;
  }

  const { ratio, url } = crop;
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = Number(ratioWidth) / Number(ratioHeight);

  return (
    <ModalImage
      aspectRatio={aspectRatio}
      caption={caption}
      highResSize={width}
      uri={url}
    />
  );
};

ArticleLeadAssetImage.propTypes = imagePropTypes;
ArticleLeadAssetImage.defaultProps = imageDefaultProps;

export default ArticleLeadAssetImage;
