import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const ArticleError = ({ message }) => (
  <View>
    <Text>An error occurred</Text>
    <Text>{message}</Text>
  </View>
);

ArticleError.propTypes = {
  message: PropTypes.string.isRequired
};

export default ArticleError;
