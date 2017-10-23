import React from "react";
import { View, Text, Platform } from "react-native";
import PropTypes from "prop-types";

import Diamond from "./diamond";

// When changing styles please debug both web, android and ios because
// some styles are not working correctly on all platforms (namely, android)
const styles = {
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
    fontSize: Platform.OS === "android" ? 10 : 12,
    fontWeight: "400",
    letterSpacing: 1.4
  }
};

// apply transformations to add uppercase and letter spacing.
// letterSpacing CSS prop does not work on android:
// https://github.com/facebook/react-native/pull/13199
const beautifyTitle = title => {
  if (Platform.OS === "android") {
    return title
      .toUpperCase()
      .split("")
      .join("\u200A");
  }
  return title.toUpperCase();
};

const ArticleFlag = ({ title, color }) => (
  <View style={styles.view}>
    <View style={styles.diamond}>
      <Diamond height={7} width={7} color={color} />
    </View>
    <Text
      accessibilityLabel={`flag-${title}`}
      testID={`flag-${title}`}
      style={[styles.title, { color }]}
    >
      {beautifyTitle(title)}
    </Text>
  </View>
);

ArticleFlag.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

ArticleFlag.defaultProps = {
  color: "black"
};

const NewArticleFlag = () => <ArticleFlag title="new" color="#E34605" />;
const UpdatedArticleFlag = () => (
  <ArticleFlag title="updated" color="#3C81BE" />
);
const ExclusiveArticleFlag = () => (
  <ArticleFlag title="exclusive" color="#C51D24" />
);
const SponsoredArticleFlag = () => (
  <ArticleFlag title="sponsored" color="#4D4D4D" />
);

export default ArticleFlag;

export {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
};
