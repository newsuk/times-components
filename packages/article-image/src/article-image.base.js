import React, { Fragment } from "react";
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

const ArticleImage = ({ imageOptions, captionOptions }) => {
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

  const renderedCaption = (
    <Context.Consumer>
      {({ theme }) => renderCaption(caption, credits, display, theme)}
    </Context.Consumer>
  );

  if (!display || !ratio) {
    return renderedCaption;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return (
    <Fragment>
      <View style={styles[`${display}Image`]}>
        <ModalImage
          aspectRatio={aspectRatio}
          caption={<Caption credits={credits} text={caption} />}
          highResSize={highResSize}
          lowResSize={lowResSize}
          uri={uri}
        />
      </View>
      {renderedCaption}
    </Fragment>
  );
};

ArticleImage.propTypes = propTypes;
ArticleImage.defaultProps = defaultPropTypes;

export default ArticleImage;
