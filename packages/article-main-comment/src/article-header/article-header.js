import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";

import { LabelWithTheme } from "@times-components/article-label";
import Flags from "../article-flags/article-flags";
import Meta from "../article-meta/article-meta";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

const ArticleHeader = ({
  authorImage,
  byline,
  flags,
  headline,
  label,
  onAuthorPress,
  publicationName,
  publishedTime,
  standfirst
}) => (
  <View style={styles.container}>
    <Image aspectRatio={1} style={styles.authorImage} uri={authorImage} />
    <LabelWithTheme label={label} style={styles.label} />
    <Text style={styles.articleHeadline}>{headline}</Text>
    <Flags flags={flags} />
    <Standfirst standfirst={standfirst} />
    <Meta
      byline={byline}
      onAuthorPress={onAuthorPress}
      publicationName={publicationName}
      publishedTime={publishedTime}
    />
  </View>
);

ArticleHeader.propTypes = {
  ...articleHeaderPropTypes,
  onAuthorPress: PropTypes.func.isRequired
};

ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
