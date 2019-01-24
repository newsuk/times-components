import React from "react";
import {
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice
} from "@times-components/fixture-generator";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "./src/slices";

export default {
  children: [
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <LeadOneFullWidthSlice lead={slice.lead} />;
      },
      name: "Lead One Full Width",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneAndOneSlice();
        return <LeadOneAndOneSlice lead={slice.lead} support={slice.support} />;
      },
      name: "Lead One And One",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};
