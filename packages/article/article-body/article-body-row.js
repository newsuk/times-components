import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BodyParagraph from "./article-body-paragraph";

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
      return (
        <View key={key}>
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
        </View>
      );
    },
    pullQuote(key, { content, caption: { name, twitter }}) {
      return (
        <View key={key}>
          <PullQuote
            key={key}
            content={content}
            caption={name}
            twitter={twitter}
          />
        </View>
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
