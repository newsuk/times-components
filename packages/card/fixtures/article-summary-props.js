import React from "react";
import ArticleLabel from "@times-components/article-label";
import DatePublication from "@times-components/date-publication";
import { renderTrees } from "@times-components/markup";
import {
  ArticleSummaryHeadline,
  renderer,
  summarise
} from "@times-components/article-summary";

export default {
  Label: () => <ArticleLabel title="Camilla Long" color="#333333" />,
  Headline: () => (
    <ArticleSummaryHeadline headline="OK, so Putin’s not a lady, but he does have the wildest man‑PMT" />
  ),
  DatePublication: () => (
    <DatePublication
      date="2017-07-10T14:32:00.000Z"
      publication="SUNDAYTIMES"
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
        }
      ]),
      renderer
    )
};
