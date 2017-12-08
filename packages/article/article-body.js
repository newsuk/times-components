import React from "react";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";

import {
  ParagraphContainer,
  Paragraph,
  PrimaryImg,
  SecondaryImg,
  InlineImg
} from "./styles/body/responsive";
import styles from "./styles/body";

const getImageContainer = imageType => {
  switch (imageType) {
    case "secondary":
      return SecondaryImg;
    case "inline":
      return InlineImg;
    default:
      return PrimaryImg;
  }
};

const ArticleBody = props => {
  const { data, index } = props.content;
  return renderTrees([data], {
    paragraph(key, attributes, children) {
      return (
        <ParagraphContainer
          testID={`paragraph-${index}`}
          accessibilityLabel={`paragraph-${index}`}
          key={key}
          style={[styles.articleMainContentRow]}
        >
          <Paragraph style={styles.articleTextElement}>{children}</Paragraph>
        </ParagraphContainer>
      );
    },
    image(key, attributes) {
      const ImageContainer = getImageContainer(attributes.display);
      return (
        <ImageContainer key={key}>
          <ArticleImage
            imageOptions={{
              display: attributes.display,
              ratio: attributes.ratio,
              url: attributes.url
            }}
            captionOptions={{
              caption: attributes.caption,
              credits: attributes.credits
            }}
          />
        </ImageContainer>
      );
    }
  });
};

ArticleBody.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    }),
    index: PropTypes.number
  }).isRequired
};

export default ArticleBody;
