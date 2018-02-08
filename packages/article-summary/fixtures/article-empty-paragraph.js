import React from "react";
import { ArticleSummaryHeadline, ArticleSummaryContent } from "../";

export default {
  labelProps: {
    title: "Camilla Long",
    color: "#333333"
  },
  datePublicationProps: {
    date: "2017-07-01T14:32:00.000Z",
    publication: "SUNDAYTIMES"
  },
  headline: () => (
    <ArticleSummaryHeadline headline="OK, so Putin’s not a lady, but he does have the wildest man‑PMT" />
  ),
  bylineProps: {
    ast: [
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
    ]
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
        },
        {
          name: "paragraph",
          attributes: {},
          children: []
        }
      ]}
    />
  )
};
