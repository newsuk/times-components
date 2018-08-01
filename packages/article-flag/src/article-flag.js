import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { IconDiamond } from "@times-components/icons";
import styles from "./style";

const ArticleFlag = ({ title, color }) => (
  <View style={styles.view}>
    <View style={styles.diamond}>
      <IconDiamond fillColour={color} height={8} width={8} />
    </View>
    <Text
      accessibilityLabel={`${title} Flag`}
      style={[styles.title, { color }]}
      testID={`flag-${title}`}
    >
      {title.toLowerCase()}
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
  <ArticleFlag color={colours.functional.articleFlagNew} title="new" />
);
const UpdatedArticleFlag = () => (
  <ArticleFlag color={colours.functional.articleFlagUpdated} title="updated" />
);
const ExclusiveArticleFlag = () => (
  <ArticleFlag
    color={colours.functional.articleFlagExclusive}
    title="exclusive"
  />
);
const SponsoredArticleFlag = () => (
  <ArticleFlag color={colours.functional.tertiary} title="sponsored" />
);

export default ArticleFlag;

export {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
};
