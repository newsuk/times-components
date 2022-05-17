import React, { Fragment } from "react";
import { TcView } from "@times-components/utils";
// import { TcView } from "@times-components/ts-components";
import Caption from "@times-components/caption";
import Context from "@times-components/context";
import { ModalImage } from "@times-components/image";
import InsetCaption from "./inset-caption";
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

function getCaptionComponent(display) {
  if (display === "primary") {
    return InsetCaption;
  }

  if (display === "fullwidth") {
    return FullWidthCaption;
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
    <TcView style={styles[`${display}Caption`]}>{captionComponent}</TcView>
  );
};

const ArticleImage = ({
  imageOptions,
  captionOptions,
  onImagePress,
  images
}) => {
  const {
    display,
    highResSize,
    index,
    lowResQuality,
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
      <TcView style={styles[`${display}Image`]}>
        <ModalImage
          accessibilityLabel={caption}
          aspectRatio={aspectRatio}
          caption={<Caption credits={credits} text={caption} />}
          highResSize={highResSize}
          index={index}
          images={images}
          lowResSize={lowResSize}
          lowResQuality={lowResQuality}
          onImagePress={onImagePress}
          uri={uri}
          relativeWidth={relativeWidth}
          relativeHeight={relativeHeight}
          relativeHorizontalOffset={relativeHorizontalOffset}
          relativeVerticalOffset={relativeVerticalOffset}
        />
      </TcView>
      {renderedCaption}
    </Fragment>
  );
};

ArticleImage.propTypes = propTypes;
ArticleImage.defaultProps = defaultPropTypes;

export default ArticleImage;
