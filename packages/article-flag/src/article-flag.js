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

const NewArticleFlag = ({ color = colours.functional.articleFlagNew }) => (
  <ArticleFlag color={color} title="new" />
);
const UpdatedArticleFlag = ({
  color = colours.functional.articleFlagUpdated
}) => <ArticleFlag color={color} title="updated" />;
const ExclusiveArticleFlag = ({
  color = colours.functional.articleFlagExclusive
}) => <ArticleFlag color={color} title="exclusive" />;
const SponsoredArticleFlag = ({ color = colours.functional.tertiary }) => (
  <ArticleFlag color={color} title="sponsored" />
);

NewArticleFlag.propTypes = articleFlagPropTypes;
NewArticleFlag.defaultProps = articleFlagDefaultProps;

UpdatedArticleFlag.propTypes = articleFlagPropTypes;
UpdatedArticleFlag.defaultProps = articleFlagDefaultProps;

ExclusiveArticleFlag.propTypes = articleFlagPropTypes;
ExclusiveArticleFlag.defaultProps = articleFlagDefaultProps;

SponsoredArticleFlag.propTypes = articleFlagPropTypes;
SponsoredArticleFlag.defaultProps = articleFlagDefaultProps;

export default ArticleFlag;

export {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
};
