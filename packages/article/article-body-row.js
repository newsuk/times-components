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
} from "./styles/body/responsive";

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

const ArticleRow = props => {
  const { data, index } = props.content;
  return renderTrees([data], {
    paragraph(key, attributes, children) {
      return (
        <BodyParagraph key={index} uid={index}>
          {children}
        </BodyParagraph>
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
    },
    pullQuote(key, { content, caption: { name, twitter } }) {
      return (
        <PullQuoteContainer key={key}>
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
