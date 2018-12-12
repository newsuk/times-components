import React from "react";
import { Text, View } from "react-native";

import Label from "../article-label/article-label";
import Flags from "../article-flags/article-flags";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

const ArticleHeader = ({
  backgroundColour,
  flags,
  headline,
  label,
  standfirst,
  textColour
}) => (
  <View
    style={[
      styles.container,
      { backgroundColor: backgroundColour, width: "100%" }
    ]}
  >
    <Label color={textColour} label={label} />
    <Text style={[styles.articleHeadline, { color: textColour }]}>
      {headline}
    </Text>
    <Flags color={textColour} flags={flags} />
    <Standfirst color={textColour} standfirst={standfirst} />
  </View>
);

ArticleHeader.propTypes = {
  ...articleHeaderPropTypes
};

ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
