import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { ResponsiveContext } from "@times-components/responsive";
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
  authorImage,
  byline,
  flags,
  hasVideo,
  headline,
  label,
  onAuthorPress,
  publicationName,
  publishedTime,
  standfirst
}) => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <View style={styles.header}>
        <View style={[styles.container, isTablet && styles.containerTablet]}>
          <Image aspectRatio={1} style={styles.authorImage} uri={authorImage} />
          <Label isVideo={hasVideo} label={label} />
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
      </View>
    )}
  </ResponsiveContext.Consumer>
);

ArticleHeader.propTypes = {
  ...articleHeaderPropTypes,
  onAuthorPress: PropTypes.func.isRequired
};

ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
