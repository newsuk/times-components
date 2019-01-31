import React from "react";
import {
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice
} from "@times-components/fixture-generator";
import {
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  SecondaryOneSlice,
  SecondaryFourSlice
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
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return (
          <SecondaryFourSlice
            secondary1={slice.secondary1}
            secondary2={slice.secondary2}
            secondary3={slice.secondary3}
            secondary4={slice.secondary4}
          />
        );
      },
      name: "Secondary Four",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};
