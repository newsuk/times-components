import React from "react";
import { colours } from "@times-components/styleguide";
import { ArticleSummaryHeadline, ArticleSummaryContent } from "../";

export default {
  labelProps: {
    title: "Camilla Long",
    color: colours.functional.primary
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
              name: "bold",
              attributes: {},
              children: [
                {
                  name: "text",
                  attributes: {
                    value: "Victoria"
                  },
                  children: []
                }
              ]
            },
            {
              name: "break",
              attributes: {},
              children: []
            },
            {
              name: "text",
              attributes: {
                value: " ITV"
              },
              children: []
            },
            {
              name: "break",
              attributes: {},
              children: []
            },
            {
              name: "text",
              attributes: {
                value: "★★★★☆"
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
              name: "bold",
              attributes: {},
              children: [
                {
                  name: "text",
                  attributes: {
                    value: "Lucy Worsley’s Nights at the Opera"
                  },
                  children: []
                }
              ]
            },
            {
              name: "break",
              attributes: {},
              children: []
            },
            {
              name: "text",
              attributes: {
                value: " BBC Two"
              },
              children: []
            },
            {
              name: "break",
              attributes: {},
              children: []
            },
            {
              name: "text",
              attributes: {
                value: "★★★☆☆"
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
                value:
                  "Poor old Harriet, Duchess of Sutherland. There she was giddily expecting a"
              },
              children: []
            }
          ]
        }
      ]}
    />
  )
};
