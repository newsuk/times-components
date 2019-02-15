import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import Context from "@times-components/context";
import DatePublication from "@times-components/date-publication";
import { colours } from "@times-components/styleguide";

import metaPropTypes from "./article-meta-prop-types";
import styles from "../styles";

const Seperator = () => <View style={styles.seperator} />;

const ArticleMeta = ({
  byline,
  isTablet,
  onAuthorPress,
  publicationName,
  publishedTime
}) => (
  <View style={[styles.metaContainer, isTablet && styles.metaContainerTablet]}>
    {byline && (
      <View style={[styles.meta, isTablet && styles.metaTablet]}>
        <Context.Consumer>
          {({ theme: { sectionColour } }) => (
            <ArticleBylineWithLinks
              ast={byline}
              color={sectionColour || colours.section.default}
              onAuthorPress={onAuthorPress}
            />
          )}
        </Context.Consumer>
      </View>
    )}
    {isTablet ? <Seperator /> : null}
    <View style={[styles.meta, isTablet && styles.metaTablet]}>
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
