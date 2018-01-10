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
                //padding-top: 0px;
                padding-left: 20px;
                display: inline-block;
                `,
    mediumUp: () => `padding-left: 0px;
                     width: 30%;
                     clear: left;
                     float:left;
                    `,
    wideUp: () => `padding-left: 0px;
                   width: 35.71429%;
                   clear: left;
                   float:left;
                  `
});

const InsetImageStyle = withResponsiveStyles(View, {
    base: () => `width: 50%;
                display: inline-block;`,
    mediumUp: () => `width: 30%;
                    float:left;
                    padding-right: 10px;`,
    wideUp: () => `width: 35.71429%;
                  float:left;
                  padding-right: 10px;
                  `
});

const CaptionStyle = withResponsiveStyles(View, {
    base: () => "padding-top: 0px;",
});


const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }

  return (
    <InsetCaptionContainerStyle key="caption">
      <CaptionStyle>
        <Caption text={caption} credits={credits}/>
      </CaptionStyle>
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
