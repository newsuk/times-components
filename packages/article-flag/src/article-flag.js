import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { IconDiamond } from "@times-components/icons";
import styles from "./style";
import {
  articleFlagTypesPropTypes,
  articleFlagTypesDefaultProps
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
  ...articleFlagTypesPropTypes,
  title: PropTypes.string.isRequired
};

ArticleFlag.defaultProps = articleFlagTypesDefaultProps;

const NewArticleFlag = ({ color }) => (
  <ArticleFlag color={color || colours.functional.tertiary} title="new" />
);
const UpdatedArticleFlag = ({ color }) => (
  <ArticleFlag color={color || colours.functional.tertiary} title="updated" />
);
const ExclusiveArticleFlag = ({ color }) => (
  <ArticleFlag color={color || colours.functional.tertiary} title="exclusive" />
);
const SponsoredArticleFlag = ({ color }) => (
  <ArticleFlag color={color || colours.functional.tertiary} title="sponsored" />
);

NewArticleFlag.propTypes = articleFlagTypesPropTypes;
NewArticleFlag.defaultProps = articleFlagTypesDefaultProps;

UpdatedArticleFlag.propTypes = articleFlagTypesPropTypes;
UpdatedArticleFlag.defaultProps = articleFlagTypesDefaultProps;

ExclusiveArticleFlag.propTypes = articleFlagTypesPropTypes;
ExclusiveArticleFlag.defaultProps = articleFlagTypesDefaultProps;

SponsoredArticleFlag.propTypes = articleFlagTypesPropTypes;
SponsoredArticleFlag.defaultProps = articleFlagTypesDefaultProps;

export default ArticleFlag;

export {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
};
