import React from "react";
import { View } from "react-native";
import Caption, { CentredCaption } from "@times-components/caption";
import Context from "@times-components/context";
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

function getCaptionComponent(display, { imageCaptionAlignment = {} }) {
  if (display === "primary") {
    return imageCaptionAlignment.primary === "center"
      ? InsetCenteredCaption
      : InsetCaption;
  }

  if (display === "fullwidth" || imageCaptionAlignment[display] === "center") {
    return CentredCaption;
  }

  return Caption;
}

const renderCaption = (caption, credits, display, theme) => {
  const CaptionComponent = getCaptionComponent(display, theme);

  return caption || credits ? (
    <View style={styles[`${display}Caption`]}>
      <CaptionComponent
        credits={credits}
        style={captionStyle[display]}
        text={caption}
      />
    </View>
  ) : null;
};

const ArticleImage = ({
  imageOptions,
  captionOptions,
  children,
  localRender,
  theme
}) => {
  const { display, highResSize, lowResSize, ratio, uri } = imageOptions;
  const { caption, credits } = captionOptions;

  if (display === "inline") {
    return (
      <InlineImage
        captionOptions={captionOptions}
        imageOptions={imageOptions}
        localRender={localRender}
      >
        {children}
      </InlineImage>
    );
  }

  const captionChildren = [renderCaption(caption, credits, display, theme)];

  if (!ratio) {
    return null;
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
    ...captionChildren
  ];
};

ArticleImage.propTypes = propTypes;
ArticleImage.defaultProps = defaultPropTypes;

export default props => (
  <Context.Consumer>
    {({ theme }) => <ArticleImage {...props} theme={theme} />}
  </Context.Consumer>
);
