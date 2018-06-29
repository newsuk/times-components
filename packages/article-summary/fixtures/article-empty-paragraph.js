import React from "react";
import { colours } from "@times-components/styleguide";
import { ArticleSummaryHeadline, ArticleSummaryContent } from "../";

const defaultByline = "Camilla Long, Environment Editor";
const defaultHeadline =
  "OK, so Putin’s not a lady, but he does have the wildest man‑PMT";
const defaultLabel = "Camilla Long";
const defaultParagraph1 =
  "Sally Jones, one of the world’s most wanted terrorists, has been killed in a US drone strike in Syria, it was revealed last night.";
const defaultParagraph2 = "The former punk";

export default (
  {
    byline = defaultByline,
    headline = defaultHeadline,
    label = defaultLabel,
    paragraph1 = defaultParagraph1,
    paragraph2 = defaultParagraph2
  } = {}
) => ({
  labelProps: {
    title: label,
    color: colours.functional.primary
  },
  datePublicationProps: {
    date: "2017-07-01T14:32:00.000Z",
    publication: "SUNDAYTIMES"
  },
  headline: () => <ArticleSummaryHeadline headline={headline} />,
  bylineProps: {
    ast: [
      {
        name: "inline",
        attributes: {},
        children: [
          {
            name: "text",
            attributes: {
              value: byline
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
                value: paragraph1
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
                value: paragraph2
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
});
