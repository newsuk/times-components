import React from "react";
import {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";

export default {
  labelProps: {
    title: "Camilla Long",
    color: "#333333"
  },
  headline: () => (
    <ArticleSummaryHeadline headline="OK, so Putin’s not a lady, but he does have the wildest man‑PMT" />
  ),
  datePublicationProps: {
    date: "2017-07-10T14:32:00.000Z",
    publication: "SUNDAYTIMES"
  },
  content: () => (
    <ArticleSummaryContent
      ast={[
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
      ]}
    />
  )
};
