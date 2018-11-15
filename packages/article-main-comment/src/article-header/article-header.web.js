import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { Text, View, ViewPropTypes } from "react-native";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import Context from "@times-components/context";
import DatePublication from "@times-components/date-publication";
import Image from "@times-components/image";

import HeaderLabel from "../article-label/article-label";
import HeaderFlags from "../article-flags/article-flags";
import HeaderStandfirst from "../article-standfirst/article-standfirst";
import styles from "../styles";

import { AuthorImageContainer, HeaderContainer, HeadlineContainer, Meta, MetaContainer, Seperator } from "../styles/responsive";

const { style: ViewStylePropTypes } = ViewPropTypes;

const ArticleHeader = ({
  authorImage,
  byline,
  flags,
  hasVideo,
  headline,
  label,
  publicationName,
  publishedTime,
  standfirst
}) => (
  <HeaderContainer>
    <AuthorImageContainer>
      <Image
        aspectRatio={1}
        uri="https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
      />
    </AuthorImageContainer>
    <HeaderLabel isVideo={hasVideo} label={label} />
    <HeadlineContainer
      accessibilityRole="heading"
      aria-level="1"
      style={styles.articleHeadLineText}
    >
      {headline}
    </HeadlineContainer>
    <HeaderFlags flags={flags} />
    <HeaderStandfirst standfirst={standfirst} />
    <MetaContainer>
        <Meta>
        <Context.Consumer>
          {({ theme: { sectionColour } }) => (
            <ArticleBylineWithLinks
              ast={byline}
              color={sectionColour || colours.section.default}
              // onAuthorPress={onAuthorPress}
            />
          )}
        </Context.Consumer>
        </Meta>
        <Seperator />
        <Meta>
          <Text style={styles.datePublication}>
            <DatePublication date={publishedTime} publication={publicationName} />
          </Text>
        </Meta>
    </MetaContainer>
  </HeaderContainer>
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
  standfirst: null,
  style: {}
};

export default ArticleHeader;
