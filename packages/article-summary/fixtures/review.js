import React from "react";
import { ArticleSummaryContent } from "../";

const defaultReview1Title = "Victoria";
const defaultReview2Title = "Lucy Worsley’s Nights at the Opera";
const defaultParagraph =
  "Poor old Harriet, Duchess of Sutherland. There she was giddily expecting a";

export default ({
  paragraph = defaultParagraph,
  review1Title = defaultReview1Title,
  review2Title = defaultReview2Title
} = {}) => ({
  content: () => (
    <ArticleSummaryContent
      ast={[
        {
          attributes: {},
          children: [
            {
              attributes: {},
              children: [
                {
                  attributes: {
                    value: review1Title
                  },
                  children: [],
                  name: "text"
                }
              ],
              name: "bold"
            },
            {
              attributes: {},
              children: [],
              name: "break"
            },
            {
              attributes: {
                value: " ITV"
              },
              children: [],
              name: "text"
            },
            {
              attributes: {},
              children: [],
              name: "break"
            },
            {
              attributes: {
                value: "★★★★☆"
              },
              children: [],
              name: "text"
            }
          ],
          name: "paragraph"
        },
        {
          attributes: {},
          children: [
            {
              attributes: {},
              children: [
                {
                  attributes: {
                    value: review2Title
                  },
                  children: [],
                  name: "text"
                }
              ],
              name: "bold"
            },
            {
              attributes: {},
              children: [],
              name: "break"
            },
            {
              attributes: {
                value: " BBC Two"
              },
              children: [],
              name: "text"
            },
            {
              attributes: {},
              children: [],
              name: "break"
            },
            {
              attributes: {
                value: "★★★☆☆"
              },
              children: [],
              name: "text"
            }
          ],
          name: "paragraph"
        },
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
  )
});
