import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { ArticleSummaryContent } from "..";

const defaultLabel = "Camilla Long";
const defaultParagraph =
  "The special forces dog fought on under fire, even after shrapnel from Taliban grenades tore into his belly and legs, blew out a front tooth and damaged his right ear.";

export default ({
  label = defaultLabel,
  paragraph = defaultParagraph
} = {}) => ({
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
    date: "2017-07-01T14:32:00.000Z",
    publication: "SUNDAYTIMES"
  },
  labelProps: {
    color: colours.functional.primary,
    title: label
  }
});
