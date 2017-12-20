import React from "react";
import { defaultProps, propTypes } from "./image-prop-types";
import { ImageWithPreview } from "./imageWithPreview";
import { ImageWithoutPreview } from "./imageWithoutPreview";
import { activatePreviewImageContextTypes } from "./activatePreviewImage";

const TimesImage = (props, context) => (
  context.previewImageActivated ? (
    <ImageWithPreview {...props} />
  ) : (
      <ImageWithoutPreview {...props} />
    )
)

TimesImage.contextTypes = activatePreviewImageContextTypes;
TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
