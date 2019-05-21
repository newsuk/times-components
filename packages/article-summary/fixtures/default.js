import React from "react";
import { colours } from "@times-components/styleguide";
import { ArticleFlags } from "@times-components/article-flag";
import { ArticleSummaryHeadline, ArticleSummaryContent } from "..";

const defaultHeadline =
  "Top medal for forces dog who took a bite out of the Taliban";
const defaultLabel = "Camilla Long";
const defaultParagraph =
  "The special forces dog fought on under fire, even after shrapnel from Taliban grenades tore into his belly and legs, blew out a front tooth and damaged his right ear.";

export default ({
  headline = defaultHeadline,
  label = defaultLabel,
  paragraph = defaultParagraph
} = {}) => ({
  bylineProps: {
    ast: [
      {
        attributes: {
          slug: "camilla-long"
        },
        children: [
          {
            attributes: {
              value: "Camilla Long"
            },
            children: [],
            name: "text"
          }
        ],
        name: "author"
      },
      {
        attributes: {},
        children: [
          {
            attributes: {
              value: ", Environment Editor"
            },
            children: [],
            name: "text"
          }
        ],
        name: "inline"
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
  datePublicationProps: {
    date: "2017-11-17T00:01:00.000Z",
    publication: "TIMES"
  },
  flags: (
    <ArticleFlags
      flags={[
        { expiryTime: "2020-03-13T12:00:00.000Z", type: "UPDATED" },
        { expiryTime: "2019-03-14T12:00:00.000Z", type: "EXCLUSIVE" }
      ]}
    />
  ),
  headline: <ArticleSummaryHeadline headline={headline} />,
  labelProps: {
    color: colours.functional.primary,
    title: label
  }
});
