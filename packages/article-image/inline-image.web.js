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
    base: () => `padding-left: 10px;
                 padding-top: 0px;
                 width: 50%;
                `,
    mediumUp: () => `padding-left: 0px;
                     width: 30%;
                    `,
    wideUp: () => `padding-left: 0px;
                   width: 35.71429%;
                  `
});

const InsetImageStyle = withResponsiveStyles(View, {
  base: () => "width: 100%;",
    // base: () => "width: 50%;",
    // mediumUp: () => "width: 30%;",
    // wideUp: () => `width: 35.71429%;
    //               //float:left;
    //               display:block;
    //               position: absolute;
    //               padding-right: 10px;
    //               margin-bottom:
    //               `
});

const CaptionStyle = withResponsiveStyles(View, {
    base: () => "padding-top: 0px;",
});


const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }
  const CaptionComponent =
    display === "primary" ? (
      <InsetCaption caption={caption} credits={credits} />
    ) : (
      <CaptionStyle>
        <Caption text={caption} credits={credits}/>
      </CaptionStyle>
    );

  return (
    <InsetCaptionContainerStyle key="caption">
      {CaptionComponent}
    </InsetCaptionContainerStyle>
  );
};

const ArticleImage = ({ imageOptions, captionOptions }) => {

  console.log('hey');
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  //const children = [renderCaption(display, caption, credits)];

  if (!display || !ratio) {
    return children;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <InsetImageStyle key="img">
      <Image uri={url} aspectRatio={aspectRatio} />
    </InsetImageStyle>,
    //...children
  ];
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
