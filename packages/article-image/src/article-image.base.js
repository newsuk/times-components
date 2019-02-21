import React from "react";
import { View } from "react-native";
import Caption, { CentredCaption } from "@times-components/caption";
import { ModalImage } from "@times-components/image";
import InsetCaption from "./inset-caption";
import InsetCenteredCaption from "./inset-centered-caption";
import InlineImage from "./inline-image";
import { propTypes, defaultPropTypes } from "./article-image-prop-types";
import styles from "./styles";

const captionStyle = {
  secondary: {
    container: {
      paddingTop: 0
    }
  }
};

function getCaptionComponent(template, display) {
  if (display === "primary") {
    return template === "indepth" ? InsetCenteredCaption : InsetCaption;
  }

  return display === "fullwidth" ? CentredCaption : Caption;
}

const renderCaption = (template, display, caption, credits) => {
  const CaptionComponent = getCaptionComponent(template, display);
  return caption || credits ? (
    <View key="caption" style={styles[`${display}Caption`]}>
      <CaptionComponent
        credits={credits}
        style={captionStyle[display]}
        text={caption}
      />
    </View>
  ) : null;
};

const ArticleImage = ({ imageOptions, captionOptions, template }) => {
  const { display, highResSize, lowResSize, ratio, uri } = imageOptions;
  const { caption, credits } = captionOptions;

  if (display === "inline") {
    return (
      <InlineImage
        captionOptions={captionOptions}
        imageOptions={imageOptions}
      />
    );
  }

  const children = [renderCaption(template, display, caption, credits)];
  if (!display || !ratio) {
    return children;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <View key="img" style={styles[`${display}Image`]}>
      <ModalImage
        aspectRatio={aspectRatio}
        caption={<Caption credits={credits} text={caption} />}
        highResSize={highResSize}
        lowResSize={lowResSize}
        uri={uri}
      />
    </View>,
    ...children
  ];
};

ArticleImage.propTypes = propTypes;
ArticleImage.defaultProps = defaultPropTypes;

export default ArticleImage;
