import React from "react";
import { ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import Ad from "@times-components/ad";
import { NewArticleFlag } from "@times-components/article-flag";
import ArticleLabel from "@times-components/article-label";

const ArticleContent = ({ code }) => (
  <ScrollView>
    <ArticleLabel title="swimming" color="#008347" />
    <Text>Default Article.</Text>
    <NewArticleFlag />
    <Ad code={code} section="article" />
  </ScrollView>
);

ArticleContent.propTypes = {
  code: PropTypes.string
};

ArticleContent.defaultProps = {
  code: "intervention"
};

export default ArticleContent;
