/* eslint-disable react/prop-types,import/no-extraneous-dependencies */
import React from "react";
import { tabletWidthMax } from "@times-components/styleguide";

const MockArticleSkeletonWrapper = "ArticleSkeleton";

const MockArticleSkeleton = ({ Header }) => (
  <MockArticleSkeletonWrapper>
    <Header width={tabletWidthMax} />
  </MockArticleSkeletonWrapper>
);

export default MockArticleSkeleton;
