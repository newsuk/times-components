import React, { Fragment } from "react";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import metaPropTypes from "./article-meta-prop-types";
import {
  DatePublicationContainer,
  Meta,
  MetaContainer,
  Separator
} from "../styles/responsive.web";
import styles from "../styles";

const ArticleMeta = ({ bylines, publicationName, publishedTime }) => (
  <MetaContainer>
    {bylines && (
      <Fragment>
        <Meta style={styles.meta}>
          <ArticleBylineWithLinks ast={bylines} />
        </Meta>
        <Separator />
      </Fragment>
    )}
    <Meta style={styles.meta}>
      <DatePublicationContainer style={styles.datePublication}>
        <DatePublication date={publishedTime} publication={publicationName} />
      </DatePublicationContainer>
    </Meta>
  </MetaContainer>
);

ArticleMeta.propTypes = metaPropTypes;

export default ArticleMeta;
