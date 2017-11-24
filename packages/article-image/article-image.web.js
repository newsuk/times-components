import React from "react";

import ArticleImage from "./component";
import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";
import {
  PrimaryContainer,
  SecondaryContainer,
  InlineContainer
} from "./styles";

const containerChooser = imageType => {
  switch (imageType) {
    case "primary":
      return PrimaryContainer;
    case "secondary":
      return SecondaryContainer;
    case "inline":
      return InlineContainer;
    default:
      return null;
  }
};

const ArticleImageWeb = props => {
  const { display, url } = props.imageOptions;
  const ImageContainer = containerChooser(display);

  return (
    <ImageContainer key={url}>
      <ArticleImage {...props} />
    </ImageContainer>
  );
};

ArticleImageWeb.propTypes = articleImagePropTypes;
ArticleImageWeb.defaultProps = articleImageDefaultPropTypes;

export default ArticleImageWeb;
