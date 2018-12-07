import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

import Label from "../article-label/article-label";
import Flags from "../article-flags/article-flags";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

const ArticleHeader = ({ flags, headline, label, standfirst }) => (
  <View style={styles.container}>
    <Label label={label} />
    <Text style={styles.articleHeadline}>{headline}</Text>
    <Flags flags={flags} />
    <Standfirst standfirst={standfirst} />
  </View>
);

ArticleHeader.propTypes = {
  ...articleHeaderPropTypes,
};

ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
