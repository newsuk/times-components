import React from "react";
import { colours } from "@times-components/styleguide";
import { ArticleSummaryHeadline } from "../";

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
  )
};
