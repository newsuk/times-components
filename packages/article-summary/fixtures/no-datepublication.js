import React from "react";
import { colours } from "@times-components/styleguide";
import { ArticleSummaryHeadline, ArticleSummaryContent } from "../";

const defaultByline = "Camilla Long, Environment Editor";
const defaultHeadline =
  "Top medal for forces dog who took a bite out of the Taliban";
const defaultLabel = "Camilla Long";
const defaultParagraph =
  "The special forces dog fought on under fire, even after shrapnel from Taliban grenades tore into his belly and legs, blew out a front tooth and damaged his right ear.";

export default (
  {
    byline = defaultByline,
    headline = defaultHeadline,
    label = defaultLabel,
    paragraph = defaultParagraph
  } = {}
) => ({
  labelProps: {
    title: label,
    color: colours.functional.primary
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
                value: paragraph
              },
              children: []
            }
          ]
        }
      ]}
    />
  )
});
