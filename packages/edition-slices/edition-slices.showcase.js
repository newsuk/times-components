import React from "react";
import { mockEditionSlice } from "@times-components/fixture-generator";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "./src/slices";

export default {
  children: [
    {
      component: () => {
        const slice = mockEditionSlice("LeadOneFullWidthSlice");
        return <LeadOneFullWidthSlice lead={slice.lead} />;
      },
      name: "Lead One Full Width",
      type: "story"
    },
    {
      component: () => {
        const slice = mockEditionSlice("LeadOneAndOneSlice");
        return <LeadOneAndOneSlice lead={slice.lead} support={slice.support} />;
      },
      name: "Lead One And One",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};
