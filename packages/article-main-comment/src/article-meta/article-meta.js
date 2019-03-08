import React, { Fragment } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import metaPropTypes from "./article-meta-prop-types";
import styles from "../styles";

const Separator = () => <View style={styles.separator} />;

const ArticleMeta = ({
  byline,
  hasStandfirst,
  isTablet,
  onAuthorPress,
  publicationName,
  publishedTime
}) => (
  <View
    style={[
      styles.metaContainer,
      !hasStandfirst && styles.metaFlagSpacer,
      isTablet && styles.metaContainerTablet
    ]}
  >
    {byline && (
      <Fragment>
        <View style={styles.meta}>
          <ArticleBylineWithLinks ast={byline} onAuthorPress={onAuthorPress} />
        </View>
      </Fragment>
    )}
    {isTablet ? <Separator /> : null}
    <View style={styles.meta}>
      <Text
        style={[
          styles.datePublication,
          isTablet && styles.datePublicationTablet
        ]}
      >
        <DatePublication date={publishedTime} publication={publicationName} />
      </Text>
    </View>
  </View>
);

ArticleMeta.propTypes = {
  ...metaPropTypes,
  onAuthorPress: PropTypes.func.isRequired
};

export default ArticleMeta;
