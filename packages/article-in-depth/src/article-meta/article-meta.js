import React, { Fragment } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import Context from "@times-components/context";
import DatePublication from "@times-components/date-publication";
import { colours } from "@times-components/styleguide";

import metaPropTypes from "./article-meta-prop-types";
import styles from "../styles";

const ArticleMeta = ({
  byline,
  isTablet,
  onAuthorPress,
  publicationName,
  publishedTime
}) => (
  <View style={isTablet && styles.metaContainerTabletFlow}>
    {byline && (
      <Fragment>
        <View style={styles.meta}>
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
        {isTablet && <View style={styles.seperator} />}
      </Fragment>
    )}
    <View style={styles.meta}>
      <Text
        style={[
          styles.datePublication,
          isTablet && styles.datePulicationTablet
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
