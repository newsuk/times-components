import React from "react";
import DatePublication from "@times-components/date-publication";
import { ArticleSummaryHeadline, renderAst } from "../";

export default {
  DatePublication: () => (
    <DatePublication date="2017-11-17T00:01:00.000Z" publication="TIMES" />
  ),
  Headline: () => (
    <ArticleSummaryHeadline headline="Top medal for forces dog who took a bite out of the Taliban" />
  ),
  summaryText: () =>
    renderAst([
      {
        name: "paragraph",
        attributes: {},
        children: [
          {
            name: "text",
            attributes: {
              value:
                "The special forces dog fought on under fire, even after shrapnel from Taliban grenades tore into his belly and legs, blew out a front tooth and damaged his right ear."
            },
            children: []
          }
        ]
      }
    ])
};
