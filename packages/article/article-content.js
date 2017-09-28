import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

const ArticleContent = ({ children }) => <View>{children}</View>;

ArticleContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default ArticleContent;
