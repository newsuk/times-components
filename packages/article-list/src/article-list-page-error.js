import React from "react";
import Button from "@times-components/button";
import Image from "@times-components/image";
import ArticleListError from "./article-list-error";
import propTypes from "./article-list-error-prop-types";
import {
  PageErrorContainer,
  PageErrorImageContainer,
  PageErrorContentContainer
} from "./styles/responsive";
import { retryButtonStyles } from "./styles/index";
import { INTERNAL_ERROR_IMAGE_BASE_URL } from "./utils/constants";

const ArticleListPageError = ({ refetch }) => (
  <PageErrorContainer>
    <PageErrorImageContainer>
      <Image
        aspectRatio={700 / 770}
        uri={`${INTERNAL_ERROR_IMAGE_BASE_URL}/d/img/internal-error-c45d0e8347.png`}
      />
    </PageErrorImageContainer>
    <PageErrorContentContainer>
      <ArticleListError />
      <Button onPress={refetch} style={retryButtonStyles} title="Retry" />
    </PageErrorContentContainer>
  </PageErrorContainer>
);

ArticleListPageError.propTypes = propTypes;

export default ArticleListPageError;
