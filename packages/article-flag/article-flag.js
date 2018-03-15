import React from "react";
import { View, Text, Platform } from "react-native";
import PropTypes from "prop-types";

import { colours, fonts, fontSizes } from "@times-components/styleguide";
import { IconDiamond } from "@times-components/icons";

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
    fontFamily: fonts.bodyRegularSmallCaps,
    fontSize: fontSizes.flags,
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
      .toLowerCase()
      .split("")
      .join("\u200A");
  }
  return title.toLowerCase();
};

const ArticleFlag = ({ title, color }) => (
  <View style={styles.view}>
    <View style={styles.diamond}>
      <IconDiamond height={8} width={8} fillColour={color} />
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

const NewArticleFlag = () => (
  <ArticleFlag title="new" color={colours.functional.articleFlagNew} />
);
const UpdatedArticleFlag = () => (
  <ArticleFlag title="updated" color={colours.functional.articleFlagUpdated} />
);
const ExclusiveArticleFlag = () => (
  <ArticleFlag
    title="exclusive"
    color={colours.functional.articleFlagExclusive}
  />
);
const SponsoredArticleFlag = () => (
  <ArticleFlag title="sponsored" color={colours.functional.tertiary} />
);

export default ArticleFlag;

export {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
};
