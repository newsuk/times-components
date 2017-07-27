import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Diamond from "./diamond";

const getStyles = color =>
  StyleSheet.create({
    flag: {
      fontFamily: "TimesDigital-RegularSC",
      fontSize: 10,
      fontWeight: "400",
      lineHeight: 20,
      letterSpacing: 1,
      color
    }
  });

const ArticleFlag = ({ title, color }) => {
  if (!title) {
    return null;
  }

  return (
    <Text style={getStyles(color).flag}>
      <Diamond height={7} width={7} color={color} /> {title.toUpperCase()}
    </Text>
  );
};

ArticleFlag.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

ArticleFlag.defaultProps = {
  color: "black"
};

const NewArticleFlag = () => <ArticleFlag title="new" color="#E34605" />;
const UpdatedArticleFlag = () =>
  <ArticleFlag title="updated" color="#3C81BE" />;
const ExclusiveArticleFlag = () =>
  <ArticleFlag title="exclusive" color="#C51D24" />;
const SponsoredArticleFlag = () =>
  <ArticleFlag title="sponsored" color="#4D4D4D" />;

export default ArticleFlag;

export {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
};
