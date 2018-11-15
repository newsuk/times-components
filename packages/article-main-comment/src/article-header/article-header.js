import React from "react";
import { Text, View } from "react-native";
import Image from "@times-components/image";

import Label from "../article-label/article-label";
import Flags from "../article-flags/article-flags";
import Meta from "../article-meta/article-meta";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

const ArticleHeader = ({
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
    <Image
      aspectRatio={1}
      style={styles.authorImage}
      uri="https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
    />
    <Label label={label} />
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

ArticleHeader.propTypes = articleHeaderPropTypes;

ArticleHeader.defaultProps = {
  ...articleHeaderDefaultProps,
  onAuthorPress: () => {}
};

export default ArticleHeader;
