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
  DatePublication: () => (
    <DatePublication date="2017-11-17T00:01:00.000Z" publication="TIMES" />
  ),
  Headline: () => (
    <ArticleSummaryHeadline headline="Top medal for forces dog who took a bite out of the Taliban" />
  ),
  Byline: () => (
    <ArticleByline
      ast={[
        {
          name: "author",
          attributes: {
            slug: "camilla-long"
          },
          children: [
            {
              name: "text",
              attributes: {
                value: "Camilla Long"
              },
              children: []
            }
          ]
        },
        {
          name: "inline",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value: ", Environment Editor"
              },
              children: []
            }
          ]
        }
      ]}
    />
  ),
  textAst: () =>
    renderTrees(
      summarise([
        {
          name: "paragraph",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value:
                  "Sally Jones, one of the world's most wanted terrorists, has been killed in a US drone strike in Syria, it was revealed last night."
              },
              children: []
            }
          ]
        },
        {
          name: "paragraph",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value: "The former punk"
              },
              children: []
            }
          ]
        },
        {
          name: "paragraph",
          attributes: {},
          children: []
        }
      ]),
      renderer
    )
};
