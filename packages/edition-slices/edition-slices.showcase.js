import React from "react";
import { MockEditionSlice } from "@times-components/fixture-generator";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "./src/slices";

export default {
  children: [
    {
      component: () => {
        const slice = MockEditionSlice("LeadOneFullWidthSlice");
        return <LeadOneFullWidthSlice lead={slice.lead} />;
      },
      name: "Lead One Full Width",
      type: "story"
    },
    {
      component: () => {
        const slice = MockEditionSlice("LeadOneAndOneSlice");
        return <LeadOneAndOneSlice lead={slice.lead} support={slice.support} />;
      },
      name: "Lead One And One",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};
