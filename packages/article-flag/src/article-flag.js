import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { IconDiamond } from "@times-components/icons";
import styles from "./style";
import {
  articleFlagPropTypes,
  articleFlagDefaultProps
} from "./article-flag-prop-types";

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
  ...articleFlagPropTypes,
  title: PropTypes.string.isRequired
};

ArticleFlag.defaultProps = articleFlagDefaultProps;

const NewArticleFlag = ({ color }) => <ArticleFlag color={color} title="new" />;
const UpdatedArticleFlag = ({ color }) => (
  <ArticleFlag color={color} title="updated" />
);
const ExclusiveArticleFlag = ({ color }) => (
  <ArticleFlag color={color} title="exclusive" />
);
const SponsoredArticleFlag = ({ color }) => (
  <ArticleFlag color={color} title="sponsored" />
);

NewArticleFlag.propTypes = articleFlagPropTypes;
NewArticleFlag.defaultProps = {
  color: colours.functional.articleFlagNew
};

UpdatedArticleFlag.propTypes = articleFlagPropTypes;
UpdatedArticleFlag.defaultProps = {
  color: colours.functional.articleFlagUpdated
};

ExclusiveArticleFlag.propTypes = articleFlagPropTypes;
ExclusiveArticleFlag.defaultProps = {
  color: colours.functional.articleFlagExclusive
};

SponsoredArticleFlag.propTypes = articleFlagPropTypes;
SponsoredArticleFlag.defaultProps = {
  color: colours.functional.tertiary
};

export default ArticleFlag;

export {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
};
