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
  diamond: {
    marginRight: 5,
    marginBottom: 1
  },
  title: {
    fontFamily: "TimesDigital-RegularSC",
    fontSize: 12,
    fontWeight: "400"
  }
});

// apply transformations to add uppercase and letter spacing.
// letterSpacing CSS prop does not work on android:
// https://github.com/facebook/react-native/pull/13199
const beautifyTitle = title => title.toUpperCase().split("").join(" ");

const ArticleFlag = ({ title, color, containerStyle }) => {
  if (!title) {
    return null;
  }

  return (
    <View style={[styles.view, containerStyle]}>
      <View style={styles.diamond}>
        <Diamond height={7} width={7} color={color} />
      </View>
      <Text style={[styles.title, { color }]}>
        {beautifyTitle(title)}
      </Text>
    </View>
  );
};

ArticleFlag.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  containerStyle: PropTypes.number
};

ArticleFlag.defaultProps = {
  color: "black",
  containerStyle: undefined
};

const NewArticleFlag = props =>
  <ArticleFlag title="new" color="#E34605" {...props} />;
const UpdatedArticleFlag = props =>
  <ArticleFlag title="updated" color="#3C81BE" {...props} />;
const ExclusiveArticleFlag = props =>
  <ArticleFlag title="exclusive" color="#C51D24" {...props} />;
const SponsoredArticleFlag = props =>
  <ArticleFlag title="sponsored" color="#4D4D4D" {...props} />;

export default ArticleFlag;

export {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
};
