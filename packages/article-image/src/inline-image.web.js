import React from "react";
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
      <figcaption>
        <Caption credits={credits} text={caption} />
      </figcaption>
    </InsetCaptionContainerStyle>
  );
};

const InlineImage = ({ imageOptions, captionOptions }) => {
  const { display, highResSize, lowResSize, ratio, uri } = imageOptions;
  const { caption, credits } = captionOptions;

  const imgCaption = renderCaption(display, caption, credits);

  if (!display || !ratio) {
    return imgCaption;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return (
    <figure style={{ margin: 0 }}>
      <InsetImageStyle key="img">
        <Image
          aspectRatio={aspectRatio}
          highResSize={highResSize}
          lowResSize={lowResSize}
          uri={uri}
        />
      </InsetImageStyle>
      {imgCaption}
    </figure>
  );
};

InlineImage.propTypes = propTypes;
InlineImage.defaultProps = defaultPropTypes;

export default InlineImage;
