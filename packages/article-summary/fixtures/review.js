import React from "react";
import { ArticleSummaryContent } from "../";

const defaultReview1Title = "Victoria";
const defaultReview2Title = "Lucy Worsley’s Nights at the Opera";
const defaultParagraph =
  "Poor old Harriet, Duchess of Sutherland. There she was giddily expecting a";

export default (
  {
    paragraph = defaultParagraph,
    review1Title = defaultReview1Title,
    review2Title = defaultReview2Title
  } = {}
) => ({
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
                    value: review1Title
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
                    value: review2Title
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
