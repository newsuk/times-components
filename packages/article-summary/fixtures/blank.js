import React from "react";
import { colours } from "@times-components/styleguide";
import { ArticleSummaryHeadline } from "..";

const defaultHeadline =
  "OK, so Putin’s not a lady, but he does have the wildest man‑PMT";
const defaultLabel = "Camilla Long";

export default ({ headline = defaultHeadline, label = defaultLabel } = {}) => ({
  datePublicationProps: {
    date: "2017-07-01T14:32:00.000Z",
    publication: "SUNDAYTIMES"
  },
  headline: <ArticleSummaryHeadline headline={headline} />,
  labelProps: {
    color: colours.functional.primary,
    title: label
  }
});
