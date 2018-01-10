import React from "react";
import { View, StyleSheet } from "react-native";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import InsetCaption from "./inset-caption";
import withResponsiveStyles from "@times-components/responsive-styles";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

const InsetCaptionContainerStyle = withResponsiveStyles(View, {
  base: () => `width: 50%;
                margin-top: -10px;
                padding-top: 5px;
                padding-left: 20px;
                padding-right: 10px;
                padding-bottom: 20px;
                display: inline-block;
                vertical-align:top;
                `,
  mediumUp: () => `padding-left: 0px;
                     width: 30%;
                     clear: left;
                     float:left;
                     margin-top: 0px;
                     padding-top: 0px;
                     padding-right: 20px;
                     padding-bottom: 40px;
                    `,
  wideUp: () => `padding-left: 0px;
                   width: 35.71429%;
                  `
});

const InsetImageStyle = withResponsiveStyles(View, {
  base: () => `width: 50%;
                padding-top: 5px;
                padding-bottom: 20px;
                display: inline-block;
                vertical-align:top;`,
  mediumUp: () => `width: 30%;
                    clear:left;
                    float:left;
                    padding-bottom: 0px;
                    padding-right: 20px;`,
  wideUp: () => `width: 35.71429%;`
});

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }

  return (
    <InsetCaptionContainerStyle key="caption">
        <Caption text={caption} credits={credits} />
    </InsetCaptionContainerStyle>
  );
};

const ArticleImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const children = [renderCaption(display, caption, credits)];

  if (!display || !ratio) {
    return children;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <InsetImageStyle key="img">
      <Image uri={url} aspectRatio={aspectRatio} />
    </InsetImageStyle>,
    ...children
  ];
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
