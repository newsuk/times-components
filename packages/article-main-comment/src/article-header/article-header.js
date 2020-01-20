import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ArticleFlags, getActiveFlags } from "@times-components/article-flag";
import { ModalImage } from "@times-components/image";
import { ResponsiveContext } from "@times-components/responsive";
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
  bylines,
  flags,
  hasVideo,
  headline,
  label,
  onAuthorPress,
  publicationName,
  publishedTime,
  standfirst,
  onImagePress
}) => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <View style={[styles.header, isTablet && styles.headerTablet]}>
        <View style={[styles.container, isTablet && styles.containerTablet]}>
          <ModalImage
            aspectRatio={1}
            style={styles.authorImage}
            uri={authorImage}
            onImagePress={onImagePress ? () => onImagePress(0) : undefined}
            rounded
          />
          <Label isVideo={hasVideo} label={label} />
          <Text
            style={[
              styles.articleHeadline,
              isTablet && styles.articleHeadlineTablet
            ]}
          >
            {headline}
          </Text>
          {getActiveFlags(flags).length > 0 && (
            <View style={styles.flags}>
              <ArticleFlags flags={flags} />
            </View>
          )}
          <Standfirst standfirst={standfirst} />
          <Meta
            bylines={bylines}
            hasStandfirst={standfirst}
            isTablet={isTablet}
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
