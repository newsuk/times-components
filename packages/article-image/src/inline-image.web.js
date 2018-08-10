import React, { Fragment } from "react";
import Caption from "@times-components/caption";
import Image from "@times-components/image";
import { propTypes, defaultPropTypes } from "./article-image-prop-types";
import {
  InsetCaptionContainerStyle,
  InsetImageStyle
} from "./styles/responsive";

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }

  return (
    <InsetCaptionContainerStyle key="caption">
      <Caption credits={credits} text={caption} />
    </InsetCaptionContainerStyle>
  );
};

const InlineImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const imgCaption = renderCaption(display, caption, credits);

  if (!display || !ratio) {
    return imgCaption;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return (
    <Fragment>
      <InsetImageStyle key="img">
        <Image aspectRatio={aspectRatio} uri={url} />
      </InsetImageStyle>
      {imgCaption}
    </Fragment>
  );
};

InlineImage.propTypes = propTypes;
InlineImage.defaultProps = defaultPropTypes;

export default InlineImage;
