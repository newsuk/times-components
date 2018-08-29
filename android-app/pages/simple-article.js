import React from "react";
import { NativeModules, Text } from "react-native";
import PropTypes from "prop-types";
import { NativeArticleProvider } from "@times-components/provider";

const { fetch } = NativeModules.NativeArticleProvider;

const SimpleArticle = ({ articleId }) => (
  <NativeArticleProvider articleId={articleId} fetch={fetch}>
    {props => <Text>{JSON.stringify(props)}</Text>}
  </NativeArticleProvider>
);

SimpleArticle.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default SimpleArticle;
