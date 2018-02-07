import React from "react";
import DatePublication from "@times-components/date-publication";
import ArticleLabel from "@times-components/article-label";
import { ArticleSummaryHeadline, renderAst } from "../";

export default {
  Label: () => <ArticleLabel title="Camilla Long" color="#333333" />,
  DatePublication: () => (
    <DatePublication
      date="2017-07-01T14:32:00.000Z"
      publication="SUNDAYTIMES"
    />
  ),
  Headline: () => (
    <ArticleSummaryHeadline headline="OK, so Putin’s not a lady, but he does have the wildest man‑PMT" />
  )
};
