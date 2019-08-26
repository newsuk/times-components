import React, { Fragment } from "react";
import { View } from "react-native";
import Caption, { CentredCaption } from "@times-components/caption";
import Context from "@times-components/context";
import { ModalImage } from "@times-components/image";
import InsetCaption from "./inset-caption";
import InsetCenteredCaption from "./inset-centered-caption";
import InlineImage from "./inline-image";
import FullWidthCaption from "./fullwidth-caption";
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

  if (display === "fullwidth") {
    return FullWidthCaption;
  }

  if (imageCaptionAlignment[display] === "center") {
    return CentredCaption;
  }

  return Caption;
}

const renderCaption = (caption, credits, display, theme) => {
  const CaptionComponent = getCaptionComponent(display, theme);

  if (!caption && !credits) {
    return null;
  }

  const captionComponent = (
    <CaptionComponent
      credits={credits}
      style={captionStyle[display]}
      text={caption}
    />
  );

  return display === "fullwidth" ? (
    captionComponent
  ) : (
    <View style={styles[`${display}Caption`]}>{captionComponent}</View>
  );
};

const ArticleImage = ({ imageOptions, captionOptions, onImagePress }) => {
  const {
    display,
    highResSize,
    index,
    lowResSize,
    ratio,
    uri,
    relativeHeight,
    relativeWidth,
    relativeHorizontalOffset,
    relativeVerticalOffset
  } = imageOptions;
  const { caption, credits } = captionOptions;

  if (display === "inline") {
    return (
      <InlineImage
        captionOptions={captionOptions}
        imageOptions={imageOptions}
        onImagePress={onImagePress}
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
          accessibilityLabel={caption}
          aspectRatio={aspectRatio}
          caption={<Caption credits={credits} text={caption} />}
          highResSize={highResSize}
          index={index}
          lowResSize={lowResSize}
          onImagePress={onImagePress}
          uri={uri}
          relativeWidth={relativeWidth}
          relativeHeight={relativeHeight}
          relativeHorizontalOffset={relativeHorizontalOffset}
          relativeVerticalOffset={relativeVerticalOffset}
        />
      </View>
      {renderedCaption}
    </Fragment>
  );
};

ArticleImage.propTypes = propTypes;
ArticleImage.defaultProps = defaultPropTypes;

export default ArticleImage;
