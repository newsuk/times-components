import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Diamond from "./diamond";

// When changing styles please debug both web, android and ios because
// some styles are not working correctly on all platforms (namely, android)
const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    marginTop: 1,
    marginLeft: 5,
    fontFamily: "TimesDigital-RegularSC",
    fontSize: 12,
    fontWeight: "400"
  }
});

// apply transformations to add uppercase and letter spacing.
// letterSpacing CSS prop does not work on android:
// https://github.com/facebook/react-native/pull/13199
const beautifyTitle = title => title.toUpperCase().split("").join(" ");

const ArticleFlag = ({ title, color, style }) => {
  if (!title) {
    return null;
  }

  return (
    <View style={[styles.view, style]}>
      <Diamond height={7} width={7} color={color} />
      <Text style={[styles.title, { color }]}>
        {beautifyTitle(title)}
      </Text>
    </View>
  );
};

ArticleFlag.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  style: PropTypes.number
};

ArticleFlag.defaultProps = {
  color: "black",
  style: undefined
};

export const NewArticleFlag = props =>
  <ArticleFlag title="new" color="#E34605" style={props.style} />;

NewArticleFlag.propTypes = {
  style: PropTypes.string
};
NewArticleFlag.defaultProps = {
  style: undefined
};

export const UpdatedArticleFlag = props =>
  <ArticleFlag title="updated" color="#3C81BE" style={props.style} />;

UpdatedArticleFlag.propTypes = {
  style: PropTypes.string
};
UpdatedArticleFlag.defaultProps = {
  style: undefined
};

export const ExclusiveArticleFlag = props =>
  <ArticleFlag title="exclusive" color="#C51D24" style={props.style} />;

ExclusiveArticleFlag.propTypes = {
  style: PropTypes.string
};
ExclusiveArticleFlag.defaultProps = {
  style: undefined
};

export const SponsoredArticleFlag = props =>
  <ArticleFlag title="sponsored" color="#4D4D4D" style={props.style} />;

SponsoredArticleFlag.propTypes = {
  style: PropTypes.string
};
SponsoredArticleFlag.defaultProps = {
  style: undefined
};

export default ArticleFlag;
