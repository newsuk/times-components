import React from "react";
import {
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockSecondaryOneSlice
} from "@times-components/fixture-generator";
import {
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  SecondaryOneSlice
} from "./src/slices";

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
    },
    {
      component: () => {
        const slice = mockSecondaryOneSlice();
        return <SecondaryOneSlice secondary={slice.secondary} />;
      },
      name: "Secondary One",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};
