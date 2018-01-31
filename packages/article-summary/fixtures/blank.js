import React from "react";
import DatePublication from "@times-components/date-publication";
import ArticleLabel from "@times-components/article-label";
import ArticleSummaryHeadline from "../article-summary-headline";

export default {
  Label: () => <ArticleLabel title="Camilla Long" color="#333333" />,
  DatePublication: () => (
    <DatePublication date="2017-11-17T00:01:00.000Z" publication="TIMES" />
  ),
  Headline: () => (
    <ArticleSummaryHeadline headline="Top medal for forces dog who took a bite out of the Taliban" />
  )
};
