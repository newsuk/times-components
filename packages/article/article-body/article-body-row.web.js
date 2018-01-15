import React from "react";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BodyParagraph from "./article-body-paragraph";
import PullQuoteWrapper from "./article-body-pullquote-wrapper.web";

import {
  PrimaryImg,
  SecondaryImg,
  InlineImg
} from "../styles/article-body/responsive";

export const responsiveImageWrapper = imageType => {
  switch (imageType) {
    case "secondary":
      return SecondaryImg;
    case "inline":
      return InlineImg;
    default:
      return PrimaryImg;
  }
};

const ArticleRow = ({ content: { data, index } }) => {
  return renderTrees([data], {
    paragraph(key, attributes, children) {
      return (
        <BodyParagraph key={index} uid={index}>
          {children}
        </BodyParagraph>
      );
    },
    image(key, { display, ratio, url, caption, credits }) {
      const ImageWrapper = responsiveImageWrapper(display);
      return (
        <ImageWrapper key={key}>
          <ArticleImage
            imageOptions={{
              display: display,
              ratio: ratio,
              url: url
            }}
            captionOptions={{
              caption: caption,
              credits: credits
            }}
          />
        </ImageWrapper>
      );
    },
    pullQuote(key, { content, caption: { name, twitter } }) {
      return (
        <PullQuoteWrapper key={key}>
          <PullQuote
            key={key}
            content={content}
            caption={name}
            twitter={twitter}
          />
        </PullQuoteWrapper>
      );
    }
  });
};

ArticleRow.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    }),
    index: PropTypes.number
  }).isRequired
};

export default ArticleRow;
