import React from "react";
import { defaultProps, propTypes } from "./image-prop-types";
import ImageWithPreview from "./image-with-preview";
import ImageWithoutPreview from "./image-without-preview";
import { activatePreviewImageContextTypes } from "./activate-preview-image";

const TimesImage = (props, context) =>
  context.previewImageActivated ? (
    <ImageWithPreview {...props} />
  ) : (
    <ImageWithoutPreview {...props} />
  );

TimesImage.contextTypes = activatePreviewImageContextTypes;
TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
