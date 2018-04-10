import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { colours } from "@times-components/styleguide";
import { IconDiamond } from "@times-components/icons";
import beautifyTitle from "./utils/beautify";
import styles from "./style";

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
