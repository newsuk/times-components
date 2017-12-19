import React, { Component } from "react";
import { defaultProps, propTypes } from "./image-prop-types";
import { ImageWithPreview } from "./imageWithPreview";
import { ImageWithoutPreview } from "./imageWithoutPreview";
import { activatePreviewImageContextTypes } from "./activatePreviewImage";

class TimesImage extends Component {
  render() {
    return this.context.previewImageActivated ? (
      <ImageWithPreview {...this.props} />
    ) : (
      <ImageWithoutPreview {...this.props} />
    );
  }
}

TimesImage.contextTypes = activatePreviewImageContextTypes;
TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
