import React from "react";
import { ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import Ad from "@times-components/ad";
import { NewArticleFlag } from "@times-components/article-flag";

const ArticleContent = ({ code }) =>
  <ScrollView>
    <Text>Default Article.</Text>
    <NewArticleFlag />
    <Ad code={code} section="article" />
  </ScrollView>;

ArticleContent.propTypes = {
  code: PropTypes.string
};

ArticleContent.defaultProps = {
  code: "intervention"
};

export default ArticleContent;
