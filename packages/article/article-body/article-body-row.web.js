import React from "react";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BodyParagraph from "./article-body-paragraph";
import ArticleLink from "./article-link";

import {
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  PullQuoteContainer,
  PullQuoteResp
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

const ArticleRow = ({ content: { data, index } }) =>
  renderTrees([data], {
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
              display,
              ratio,
              url
            }}
            captionOptions={{
              caption,
              credits
            }}
          />
        </ImageWrapper>
      );
    },
    pullQuote(key, { content, caption: { name, twitter } }) {
      return (
        <PullQuoteContainer>
          <PullQuoteResp>
            <PullQuote
              key={key}
              content={content}
              caption={name}
              twitter={twitter}
            />
          </PullQuoteResp>
        </PullQuoteContainer>
      );
    },
    link(key, attributes, children) {
      return (
        <ArticleLink
          key={index}
          uuid={index}
          onPress={() => {}}
          url={attributes.href}
        >
          {children}
        </ArticleLink>
      );
    }
  });

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
