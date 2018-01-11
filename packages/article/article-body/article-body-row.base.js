import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BodyParagraph from "./article-body-paragraph";

const ArticleRow = ({ content, imageWrapperFunction, PullQuoteWrapper }) => {
  const { data, index } = content;
  return renderTrees([data], {
    paragraph(key, attributes, children) {
      return (
        <BodyParagraph key={index} uid={index}>
          {children}
        </BodyParagraph>
      );
    },
    image(key, attributes) {
      const ImageWrapper = imageWrapperFunction
        ? imageWrapperFunction(attributes.display)
        : View;
      return (
        <ImageWrapper key={key}>
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
        </ImageWrapper>
      );
    },
    pullQuote(key, attributes) {
      const { name, twitter } = attributes.caption;
      const PW = PullQuoteWrapper || View;
      return (
        <PW key={key}>
          <PullQuote
            key={key}
            content={attributes.content}
            caption={name}
            twitter={twitter}
          />
        </PW>
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
