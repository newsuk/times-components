import React from "react";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import metaPropTypes from "./article-meta-prop-types";
import {
  DatePublicationContainer,
  Meta,
  MetaContainer,
  Seperator
} from "../styles/responsive.web";
import styles from "../styles";

const ArticleMeta = ({ byline, publicationName, publishedTime }) => (
  <MetaContainer>
    <Meta style={styles.meta}>
      <ArticleBylineWithLinks ast={byline} />
    </Meta>
    <Seperator />
    <Meta style={styles.meta}>
      <DatePublicationContainer style={styles.datePublication}>
        <DatePublication date={publishedTime} publication={publicationName} />
      </DatePublicationContainer>
    </Meta>
  </MetaContainer>
);

ArticleMeta.propTypes = metaPropTypes;

export default ArticleMeta;
