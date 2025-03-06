import React, { Fragment } from "react";
import {
  ArticleBylineWithLinks,
  hasBylineData
} from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import { checkStylesForUnits } from "@times-components/utils";

import metaPropTypes from "./article-meta-prop-types";
import {
  DatePublicationContainer,
  Meta,
  MetaContainer,
  Separator
} from "../styles/responsive";
import styles from "../styles";

const ArticleMeta = ({ bylines, publicationName, publishedTime }) => (
  <MetaContainer>
    {hasBylineData(bylines) && (
      <Fragment>
        <Meta styles={styles.meta}>
          <ArticleBylineWithLinks ast={bylines} />
        </Meta>
        <Separator />
      </Fragment>
    )}
    <Meta styles={styles.meta}>
      <DatePublicationContainer
        styles={checkStylesForUnits(styles.datePublication)}
      >
        <DatePublication date={publishedTime} publication={publicationName} />
      </DatePublicationContainer>
    </Meta>
  </MetaContainer>
);

ArticleMeta.propTypes = metaPropTypes;

export default ArticleMeta;
