import React from "react";
import { colours } from "@times-components/styleguide";
import { ArticleSummaryHeadline, ArticleSummaryContent } from "../";

export default {
  labelProps: {
    title: "Francis Elliott",
    color: colours.functional.primary
  },
  datePublicationProps: {
    date: "2017-11-17T00:01:00.000Z",
    publication: "TIMES"
  },
  headline: () => (
    <ArticleSummaryHeadline headline="Sajid Javid to end hostile era for illegal immigrants" />
  ),
  content: () => (
    <ArticleSummaryContent
      ast={[
        {
          name: "paragraph",
          children: [
            {
              name: "link",
              attributes: {
                href:
                  "https://www.thetimes.co.uk/edition/news/sajid-javid-son-of-bus-driver-who-rose-from-poverty-to-become-home-secretary-9606jg3h7",
                type: "article",
                canonicalId:
                  "sajid-javid-son-of-bus-driver-who-rose-from-poverty-to-become-home-secretary-9606jg3h7"
              },
              children: [
                {
                  name: "text",
                  attributes: {
                    value: "Sajid Javid"
                  },
                  children: []
                }
              ]
            },
            {
              name: "text",
              attributes: {
                value:
                  " has warned the Home Office to expect an overhaul after the "
              },
              children: []
            },
            {
              name: "link",
              attributes: {
                href:
                  "https://www.thetimes.co.uk/article/timeline-windrush-immigration-scandals-29s3vtp53",
                type: "article",
                canonicalId: "timeline-windrush-immigration-scandals-29s3vtp53"
              },
              children: [
                {
                  name: "text",
                  attributes: {
                    value: "Windrush scandal"
                  },
                  children: []
                }
              ]
            },
            {
              name: "text",
              attributes: {
                value: " as he ditches the policy of creating a “hostile"
              },
              children: []
            }
          ]
        }
      ]}
    />
  )
};
