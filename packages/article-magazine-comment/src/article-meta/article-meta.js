import React, { Fragment } from "react";
import {
  ArticleBylineWithLinks,
  hasBylineData
} from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import metaPropTypes from "./article-meta-prop-types";
import {
  DatePublicationContainer,
  Meta,
  MetaContainer,
  Separator
} from "../newStyles/responsive";
import newStyles from "../newStyles";

const ArticleMeta = ({ bylines, publicationName, publishedTime }) => (
  <MetaContainer>
    {hasBylineData(bylines) && (
      <Fragment>
        <Meta styles={newStyles.meta}>
          <ArticleBylineWithLinks ast={bylines} />
        </Meta>
        <Separator />
      </Fragment>
    )}
    <Meta style={newStyles.meta}>
      <DatePublicationContainer styles={newStyles.datePublication}>
        <DatePublication date={publishedTime} publication={publicationName} />
      </DatePublicationContainer>
    </Meta>
  </MetaContainer>
);

ArticleMeta.propTypes = metaPropTypes;

export default ArticleMeta;
