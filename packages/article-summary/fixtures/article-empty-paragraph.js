import React from "react";
import ArticleLabel from "@times-components/article-label";
import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import { renderTrees } from "@times-components/markup";
import {
  ArticleSummaryHeadline,
  renderer,
  summarise
} from "../";

export default {
  Label: () => <ArticleLabel title="Camilla Long" color="#333333" />,
  DatePublication: () => (
    <DatePublication date="2017-07-01T14:32:00.000Z" publication="SUNDAYTIMES" />
  ),
  Headline: () => (
    <ArticleSummaryHeadline headline="OK, so Putin’s not a lady, but he does have the wildest man‑PMT" />
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
                  "Sally Jones, one of the world’s most wanted terrorists, has been killed in a US drone strike in Syria, it was revealed last night."
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
