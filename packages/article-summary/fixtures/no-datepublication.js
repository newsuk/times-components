import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { ArticleSummaryHeadline, ArticleSummaryContent } from "..";

const defaultByline = "Camilla Long, Environment Editor";
const defaultHeadline =
  "Top medal for forces dog who took a bite out of the Taliban";
const defaultLabel = "Camilla Long";
const defaultParagraph =
  "The special forces dog fought on under fire, even after shrapnel from Taliban grenades tore into his belly and legs, blew out a front tooth and damaged his right ear.";

export default ({
  byline = defaultByline,
  headline = defaultHeadline,
  label = defaultLabel,
  paragraph = defaultParagraph
} = {}) => ({
  bylineProps: {
    ast: [
      {
        byline: [
          {
            attributes: {},
            children: [
              {
                attributes: {
                  value: byline
                },
                children: [],
                name: "text"
              }
            ],
            name: "inline"
          }
        ]
      }
    ]
  },
  content: (
    <ArticleSummaryContent
      ast={[
        {
          attributes: {},
          children: [
            {
              attributes: {
                value: paragraph
              },
              children: [],
              name: "text"
            }
          ],
          name: "paragraph"
        }
      ]}
    />
  ),
  headline: <ArticleSummaryHeadline headline={headline} />,
  labelProps: {
    color: colours.functional.primary,
    title: label
  }
});
