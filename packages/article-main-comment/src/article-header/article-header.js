import React from "react";
import PropTypes from "prop-types";
import { Text, View, ViewPropTypes } from "react-native";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import Context from "@times-components/context";
import DatePublication from "@times-components/date-publication";
import Image from "@times-components/image";
import { colours } from "@times-components/styleguide";

import HeaderLabel from "../article-label/article-label";
import HeaderFlags from "../article-flags/article-flags";
import HeaderStandfirst from "../article-standfirst/article-standfirst";
import styles from "../styles";

const { style: ViewStylePropTypes } = ViewPropTypes;

const ArticleHeader = ({
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
  <View style={styles.container}>
      <Image
        aspectRatio={1}
        style={{width: 100, height: 100, borderRadius: 50, overflow: "hidden"}}
        uri="https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
      />
    <HeaderLabel isVideo={hasVideo} label={label} />
    <Text style={styles.articleHeadLineText}>
      {headline}
    </Text>
    <HeaderFlags flags={flags} />
    <HeaderStandfirst standfirst={standfirst} />
    <View style={styles.metaContainer}>
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
      <View style={styles.meta}>
        <Text style={styles.datePublication}>
          <DatePublication date={publishedTime} publication={publicationName} />
        </Text>
      </View>
    </View>
  </View>
);

ArticleHeader.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.string),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  style: ViewStylePropTypes
};

ArticleHeader.defaultProps = {
  flags: [],
  hasVideo: false,
  label: null,
  onAuthorPress: () => {},
  standfirst: null,
  style: {},
};

export default ArticleHeader;
