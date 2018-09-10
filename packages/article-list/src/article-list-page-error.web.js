import React from "react";
import Image from "@times-components/image";
import ArticleListError from "./article-list-error";
import propTypes from "./article-list-error-prop-types";
import {
  PageErrorContainer,
  PageErrorImageContainer,
  PageErrorContentContainer
} from "./styles/responsive";

const ArticleListPageError = ({ refetch }) => (
  <PageErrorContainer>
    <PageErrorImageContainer>
      <Image
        aspectRatio={700 / 770}
        uri="https://www.thetimes.co.uk/d/img/internal-error-c45d0e8347.png"
      />
    </PageErrorImageContainer>
    <PageErrorContentContainer>
      <ArticleListError refetch={refetch} />
    </PageErrorContentContainer>
  </PageErrorContainer>
);

ArticleListPageError.propTypes = propTypes;

export default ArticleListPageError;
