import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ArticleFlags } from "@times-components/article-flag";
import Image from "@times-components/image";
import Context from "@times-components/context";
import { fontFactory } from "@times-components/styleguide";

import Label from "../article-label/article-label";
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
  isTablet,
  label,
  onAuthorPress,
  publicationName,
  publishedTime,
  standfirst
}) => (
  <Context.Consumer>
    {({ theme: { headlineFont } }) => (
      <View style={[styles.container, isTablet && styles.containerTablet]}>
        <Image
          aspectRatio={1}
          style={[styles.authorImage, isTablet && styles.authorImageTablet]}
          uri={authorImage}
        />
        <Label isVideo={hasVideo} label={label} />
        <Text
          style={[
            styles.articleHeadline,
            {
              ...fontFactory({
                font: headlineFont || "headline",
                fontSize: isTablet ? "pageHeadline" : "headline"
              })
            }
          ]}
        >
          {headline}
        </Text>
        {flags.length > 0 && (
          <View style={styles.flags}>
            <ArticleFlags flags={flags} />
          </View>
        )}
        <Standfirst standfirst={standfirst} />
        <Meta
          byline={byline}
          hasElementsAbove={flags.length > 0 || standfirst}
          isTablet={isTablet}
          onAuthorPress={onAuthorPress}
          publicationName={publicationName}
          publishedTime={publishedTime}
        />
      </View>
    )}
  </Context.Consumer>
);

ArticleHeader.propTypes = {
  ...articleHeaderPropTypes,
  onAuthorPress: PropTypes.func.isRequired
};

ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
