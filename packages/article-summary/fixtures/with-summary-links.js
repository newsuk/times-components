import React from "react";
import { colours } from "@times-components/styleguide";
import { ArticleSummaryHeadline, ArticleSummaryContent } from "../";

const defaultHeadline = "Sajid Javid to end hostile era for illegal immigrants";
const defaultLabel = "Francis Elliott";
const defaultLink1 =
  "https://www.thetimes.co.uk/edition/news/sajid-javid-son-of-bus-driver-who-rose-from-poverty-to-become-home-secretary-9606jg3h7";
const defaultId1 =
  "sajid-javid-son-of-bus-driver-who-rose-from-poverty-to-become-home-secretary-9606jg3h7";
const defaultLink2 =
  "https://www.thetimes.co.uk/article/timeline-windrush-immigration-scandals-29s3vtp53";
const defaultId2 = "timeline-windrush-immigration-scandals-29s3vtp53";

export default (
  {
    headline = defaultHeadline,
    label = defaultLabel,
    link1 = defaultLink1,
    id1 = defaultId1,
    link2 = defaultLink2,
    id2 = defaultId2
  } = {}
) => ({
  labelProps: {
    title: label,
    color: colours.functional.primary
  },
  datePublicationProps: {
    date: "2017-11-17T00:01:00.000Z",
    publication: "TIMES"
  },
  headline: () => <ArticleSummaryHeadline headline={headline} />,
  content: () => (
    <ArticleSummaryContent
      ast={[
        {
          name: "paragraph",
          children: [
            {
              name: "link",
              attributes: {
                href: link1,
                type: "article",
                canonicalId: id1
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
                href: link2,
                type: "article",
                canonicalId: id2
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
});
