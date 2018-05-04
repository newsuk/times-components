import React from "react";
import Image from "@times-components/image";
import AuthorProfileListError from "./article-list-error";
import propTypes from "./article-list-error-prop-types";
import {
  PageErrorContainer,
  PageErrorImageContainer
} from "./styles/responsive";

const ArticleListPageError = ({ refetch }) => (
  <PageErrorContainer>
    <AuthorProfileListError refetch={refetch} />
    <PageErrorImageContainer>
      <Image
        aspectRatio={700 / 770}
        uri="https://www.thetimes.co.uk/d/img/internal-error-c45d0e8347.png"
      />
    </PageErrorImageContainer>
  </PageErrorContainer>
);

ArticleListPageError.propTypes = propTypes;

export default ArticleListPageError;
