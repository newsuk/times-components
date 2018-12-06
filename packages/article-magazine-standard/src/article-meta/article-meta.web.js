import React from "react";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import Context from "@times-components/context";
import DatePublication from "@times-components/date-publication";
import { colours } from "@times-components/styleguide";

import metaPropTypes from "./article-meta-prop-types";
import {
  DatePublicationContainer,
  Meta,
  MetaContainer,
  Separator
} from "../styles/responsive.web";
import styles from "../styles";

const ArticleMeta = ({ byline, publicationName, publishedTime }) => (
  <MetaContainer>
    <Meta style={styles.meta}>
      <Context.Consumer>
        {({ theme: { sectionColour } }) => (
          <ArticleBylineWithLinks
            ast={byline}
            color={sectionColour || colours.section.default}
          />
        )}
      </Context.Consumer>
    </Meta>
    <Separator />
    <Meta style={styles.meta}>
      <DatePublicationContainer style={styles.datePublication}>
        <DatePublication date={publishedTime} publication={publicationName} />
      </DatePublicationContainer>
    </Meta>
  </MetaContainer>
);

ArticleMeta.propTypes = metaPropTypes;

export default ArticleMeta;
