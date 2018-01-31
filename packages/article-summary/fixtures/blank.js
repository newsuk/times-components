import React from "react";
import ArticleLabel from "@times-components/article-label";
import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import { renderTrees } from "@times-components/markup";
import ArticleSummaryHeadline from "../article-summary-headline";
import renderer from "../article-summary-renderer";
import summarise from "../summarise";

export default {
  Label: () => <ArticleLabel title="Camilla Long" color="#333333" />,
  DatePublication: () => <DatePublication date="2017-11-17T00:01:00.000Z" publication="TIMES" />,
  Headline: () => <ArticleSummaryHeadline headline="Top medal for forces dog who took a bite out of the Taliban" />
}
